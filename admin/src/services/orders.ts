import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  updateDoc,
} from "firebase/firestore"

import { db } from "../firebase/firebase"
import type { Order } from "../../order"

export type ShippingAddress = {
  id?: string
  streetAddress?: string
  building?: string
  floor?: string
  apartment?: string
  area?: string
  city?: string
  fullName?: string
  phone?: string
  email?: string
  notes?: string
}

// ---------- Helpers ----------

function parseVariantId(rawId: string, fallbackColor?: string, fallbackSize?: string) {
  // Trust the stored color and size from order items since they're already correct
  // The variant ID format is: ${productId}-${color}-${size}
  // Since color and size can contain hyphens (e.g., "Daydream Blue", "10-12Y"),
  // we can't reliably parse them by splitting on hyphens
  // Instead, extract productId (before first hyphen) and use stored color/size
  const variantId = String(rawId || "")
  const firstHyphenIndex = variantId.indexOf("-")
  
  // Extract productId (the part before the first hyphen)
  // Firestore document IDs typically don't contain hyphens
  const productId = firstHyphenIndex > 0 
    ? variantId.substring(0, firstHyphenIndex)
    : variantId
  
  // Trust the stored color and size from the order item (fallbackColor and fallbackSize)
  // These are already correct and handle hyphens properly
  return { 
    productId, 
    color: fallbackColor ?? "", 
    size: fallbackSize ?? "" 
  }
}

// ---------- Reads / Live ----------

export function listenOrders(
  onData: (orders: Order[]) => void,
  onError?: (err: any) => void
) {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"))

  return onSnapshot(
    q,
    (snap) => {
      const data: Order[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }))
      onData(data)
    },
    (err) => onError?.(err)
  )
}

export async function fetchOrderShippingAddress(orderId: string): Promise<ShippingAddress | null> {
  const ref = doc(db, "orders", orderId, "shipping", "address")
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { id: snap.id, ...(snap.data() as any) }
}

// Alias (nicer name for UI)
export async function fetchShippingAddress(orderId: string) {
  return fetchOrderShippingAddress(orderId)
}

// ---------- Updates ----------

export async function updateOrderStatus(orderId: string, status: string) {
  const ref = doc(db, "orders", orderId)
  await updateDoc(ref, { status })
}

// ---------- Delete + Restock (ADMIN) ----------

export async function deleteOrderAndRestock(orderId: string) {
  const orderRef = doc(db, "orders", orderId)
  const shippingRef = doc(db, "orders", orderId, "shipping", "address")

  await runTransaction(db, async (tx) => {
    const orderSnap = await tx.get(orderRef)
    if (!orderSnap.exists()) throw new Error("Order not found")

    const orderData = orderSnap.data() as any
    const items = Array.isArray(orderData.items) ? orderData.items : []

    // Build unique productIds
    const productIds: string[] = Array.from(
      new Set(
        items.map((it: any) => {
          const { productId } = parseVariantId(it.id, it.color, it.size)
          return productId
        })
      )
    )

    // Read all products once
    const productCache = new Map<string, { ref: ReturnType<typeof doc>; data: any }>()
    for (const pid of productIds) {
      const pref = doc(db, "products", pid)
      const psnap = await tx.get(pref)
      if (!psnap.exists()) throw new Error(`Product not found: ${pid}`)
      productCache.set(pid, { ref: pref, data: psnap.data() })
    }

    // Restock
    for (const it of items) {
      const qty = Number(it.quantity ?? 0)
      if (!qty) continue

      const { productId, color, size } = parseVariantId(it.id, it.color, it.size)
      const cached = productCache.get(productId)
      if (!cached) throw new Error(`Product missing in cache: ${productId}`)

      const stockBySize: Record<string, number> = { ...(cached.data.stockBySize ?? {}) }

      // Support both:
      // 1) stockBySize["10-12Y"] = 7
      // 2) stockBySize["Rosie Hugs-10-12Y"] = 7
      const keyColorSize = `${color}-${size}`
      const keySizeOnly = `${size}`

      let keyToUse: string | null = null
      if (Object.prototype.hasOwnProperty.call(stockBySize, keyColorSize)) keyToUse = keyColorSize
      else if (Object.prototype.hasOwnProperty.call(stockBySize, keySizeOnly)) keyToUse = keySizeOnly
      else {
        throw new Error(
          `Stock key not found for product ${productId}. Tried "${keyColorSize}" and "${keySizeOnly}".`
        )
      }

      const current = Number(stockBySize[keyToUse] ?? 0)
      stockBySize[keyToUse] = current + qty

      // Update cache so multiple items for same product accumulate
      cached.data = { ...cached.data, stockBySize }
      productCache.set(productId, cached)

      tx.update(cached.ref, { stockBySize })
    }

    // Delete known order docs
    tx.delete(shippingRef) // safe even if it doesn't exist
    tx.delete(orderRef)
  })
}
