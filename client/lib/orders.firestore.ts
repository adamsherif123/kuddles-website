import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { ShippingAddress } from "@/lib/cart-context"

export type OrderItem = {
  id: string
  name: string
  price: number
  image: string
  color: string
  size: string
  quantity: number
}

export type PaymentMethod = "paymob" | "cod"

export type CreateOrderInput = {
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
}

function parseVariantId(rawId: string, fallbackColor: string, fallbackSize: string) {
  // Trust the stored color and size from cart items since they're already correct
  // The variant ID format is: ${productId}-${color}-${size}
  // Since color and size can contain hyphens (e.g., "Daydream Blue", "10-12Y"),
  // we can't reliably parse them by splitting on hyphens
  // Instead, extract productId (before first hyphen) and use stored color/size
  const variantId = String(rawId)
  const firstHyphenIndex = variantId.indexOf("-")
  
  // Extract productId (the part before the first hyphen)
  // Firestore document IDs typically don't contain hyphens
  const productId = firstHyphenIndex > 0 
    ? variantId.substring(0, firstHyphenIndex)
    : variantId
  
  // Trust the stored color and size from the cart item (fallbackColor and fallbackSize)
  // These are already correct and handle hyphens properly
  return { 
    productId, 
    color: fallbackColor, 
    size: fallbackSize 
  }
}


export async function createOrder(input: CreateOrderInput): Promise<{ orderId: string }> {
  const { items, subtotal, shipping, total, shippingAddress, paymentMethod } = input
  const isCOD = paymentMethod === "cod"

  // If cart has repeated same product/color/size lines, merge them so we decrement correctly
  const merged = new Map<string, OrderItem>()
  for (const it of items) {
    const { productId, color, size } = parseVariantId(it.id, it.color, it.size)
    const k = `${productId}__${color}__${size}`
    const prev = merged.get(k)
    merged.set(k, prev ? { ...it, id: productId, color, size, quantity: prev.quantity + it.quantity } : { ...it, id: productId, color, size })
  }
  const mergedItems = Array.from(merged.values())

  const orderRef = doc(collection(db, "orders"))
  const shippingRef = doc(db, "orders", orderRef.id, "shipping", "address")

  await runTransaction(db, async (tx) => {
    // 1) Read all product docs needed (each once)
    const productRefs = new Map<string, ReturnType<typeof doc>>()
    for (const it of mergedItems) {
      if (!productRefs.has(it.id)) {
        productRefs.set(it.id, doc(db, "products", it.id))
      }
    }

    const productSnaps = new Map<string, any>()
    for (const [productId, pref] of productRefs.entries()) {
      const snap = await tx.get(pref)
      if (!snap.exists()) throw new Error(`Product not found: ${productId}`)
      productSnaps.set(productId, { ref: pref, data: snap.data() })
    }

    // 2) Compute and apply stock decrements
    for (const it of mergedItems) {
      const { ref, data } = productSnaps.get(it.id)
      const stockBySize: Record<string, number> = { ...(data.stockBySize ?? {}) }

      // Prefer "Color-Size" key (multi-color case), fallback to "Size" key (your screenshot case)
      const keyColorSize = `${it.color}-${it.size}`
      const keySizeOnly = it.size

      let keyToUse: string | null = null
      if (Object.prototype.hasOwnProperty.call(stockBySize, keyColorSize)) keyToUse = keyColorSize
      else if (Object.prototype.hasOwnProperty.call(stockBySize, keySizeOnly)) keyToUse = keySizeOnly
      else if (Object.keys(stockBySize).length === 0) throw new Error(`No stockBySize on product ${it.id}`)
      else {
        // If keys exist but don’t match exactly, fail loudly so you fix your data shape
        throw new Error(
          `Stock key not found for product ${it.id}. Tried "${keyColorSize}" and "${keySizeOnly}".`
        )
      }

      const current = Number(stockBySize[keyToUse] ?? 0)
      const next = current - Number(it.quantity)

      if (next < 0) {
        throw new Error(
          `Insufficient stock for "${it.name}" (${it.color}, ${it.size}). Have ${current}, need ${it.quantity}.`
        )
      }

      stockBySize[keyToUse] = next

      tx.update(ref, {
        stockBySize,
        updatedAt: serverTimestamp(),
      })
    }

    // 3) Create the order in the same transaction (so order + stock change are atomic)
    tx.set(orderRef, {
      source: "client",
      currency: "EGP",
      subtotal,
      shipping,
      total,

      paymentProvider: isCOD ? "cash_on_delivery" : "paymob",
      paymentMethod,
      paymentStatus: isCOD ? "cod" : "unpaid",
      status: isCOD ? "cash_on_delivery" : "created",

      items: mergedItems.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        image: i.image,
        color: i.color,
        size: i.size,
        quantity: i.quantity,
        lineTotal: Number(i.price) * Number(i.quantity),
      })),

      customer: {
        fullName: shippingAddress.fullName ?? "",
        phone: shippingAddress.phone ?? "",
        email: shippingAddress.email ?? "",
        city: shippingAddress.city ?? "",
        area: shippingAddress.area ?? "",
      },

      createdAt: serverTimestamp(), 
      updatedAt: serverTimestamp(),
    })

    tx.set(shippingRef, {
      ...shippingAddress,
      createdAt: serverTimestamp(),
    })
  })

  return { orderId: orderRef.id }
}
