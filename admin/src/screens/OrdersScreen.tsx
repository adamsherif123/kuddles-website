import React, { useEffect, useMemo, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native"

import SheetModal from "../components/SheetModal"
import type { Order } from "../../order"
import {
  fetchOrderShippingAddress,
  listenOrders,
  updateOrderStatus,
  deleteOrderAndRestock,
  type ShippingAddress,
} from "../services/orders"

const STATUS_OPTIONS = ["pending", "paid", "fulfilled", "cancelled", "failed"]

function formatMoney(v: number, currency = "EGP") {
  const n = Number.isFinite(Number(v)) ? Number(v) : 0
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(n)
  } catch {
    return `${currency} ${n.toFixed(2)}`
  }
}

function formatDate(ts: any) {
  const d = ts?.toDate?.() instanceof Date ? ts.toDate() : ts instanceof Date ? ts : null
  return d ? d.toLocaleString() : "—"
}

function statusPillStyle(status: string) {
  const s = String(status || "pending").toLowerCase()
  if (s === "paid") return { bg: "#DCFCE7", fg: "#166534", border: "#86EFAC" }
  if (s === "fulfilled" || s === "delivered" || s === "completed")
    return { bg: "#DBEAFE", fg: "#1D4ED8", border: "#93C5FD" }
  if (s === "cancelled") return { bg: "#FEE2E2", fg: "#991B1B", border: "#FCA5A5" }
  if (s === "failed") return { bg: "#FFE4E6", fg: "#9F1239", border: "#FDA4AF" }
  return { bg: "#FEF3C7", fg: "#92400E", border: "#FCD34D" } // pending/default
}

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selected, setSelected] = useState<Order | null>(null)
  const [address, setAddress] = useState<ShippingAddress | null>(null)
  const [addrLoading, setAddrLoading] = useState(false)

  const [savingStatus, setSavingStatus] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const unsub = listenOrders(
      (data) => {
        setOrders(data)
        setError(null)
        setLoading(false)
      },
      (e) => {
        setError(e?.message ?? "Failed to load orders")
        setLoading(false)
      }
    )
    return () => unsub()
  }, [])

  const totals = useMemo(() => {
    const count = orders.length
    const pending = orders.filter((o) => String(o.status ?? "pending").toLowerCase() === "pending").length
    const paid = orders.filter((o) => String(o.status ?? "").toLowerCase() === "paid").length
    return { count, pending, paid }
  }, [orders])

  async function openOrder(o: Order) {
    setSelected(o)
    setAddress(null)
    setAddrLoading(true)
    try {
      const addr = await fetchOrderShippingAddress(o.id)
      setAddress(addr)
    } catch {
      setAddress(null)
    } finally {
      setAddrLoading(false)
    }
  }

  function closeOrder() {
    setSelected(null)
    setAddress(null)
  }

  async function setStatus(nextStatus: string) {
    if (!selected) return
    setSavingStatus(true)
    try {
      await updateOrderStatus(selected.id, nextStatus)
      setOrders((prev) => prev.map((o) => (o.id === selected.id ? { ...o, status: nextStatus } : o)))
      setSelected((prev) => (prev ? { ...prev, status: nextStatus } : prev))
    } catch (e: any) {
      setError(e?.message ?? "Failed to update status")
    } finally {
      setSavingStatus(false)
    }
  }

  async function onDeleteOrder() {
    if (!selected) return
  
    // ✅ Web-safe confirmation (works on Expo Web / RN Web)
    const ok =
      typeof window !== "undefined"
        ? window.confirm(
            "Delete order?\n\nThis will delete the order from Firestore and restock all items back into inventory."
          )
        : true
  
    if (!ok) return
  
    setDeleting(true)
    setError(null)
  
    try {
      console.log("[ADMIN] deleteOrderAndRestock start:", selected.id)
      await deleteOrderAndRestock(selected.id)
      console.log("[ADMIN] deleteOrderAndRestock success:", selected.id)
  
      setOrders((prev) => prev.filter((o) => o.id !== selected.id))
      closeOrder()
  
      // Optional: quick feedback
      if (typeof window !== "undefined") window.alert("Order deleted & stock restored ✅")
    } catch (e: any) {
      console.error("[ADMIN] deleteOrderAndRestock failed:", e)
      setError(e?.message ?? String(e) ?? "Failed to delete order")
      if (typeof window !== "undefined") window.alert(e?.message ?? "Failed to delete order")
    } finally {
      setDeleting(false)
    }
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Orders</Text>
          <Text style={styles.subtitle}>View, pack, ship, and update order status.</Text>
        </View>
      </View>

      <View style={styles.kpiRow}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Total Orders</Text>
          <Text style={styles.kpiValue}>{totals.count}</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Pending</Text>
          <Text style={styles.kpiValue}>{totals.pending}</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Paid</Text>
          <Text style={styles.kpiValue}>{totals.paid}</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.muted}>Loading…</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={{ color: "#B91C1C", fontWeight: "800" }}>{error}</Text>
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.muted}>No orders yet.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(o) => o.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => {
            const pill = statusPillStyle(item.status ?? "pending")
            return (
              <Pressable onPress={() => openOrder(item)} style={styles.card}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.orderId}>Order #{item.id.slice(0, 8).toUpperCase()}</Text>
                    <Text style={styles.mutedSmall}>{formatDate(item.createdAt)}</Text>
                  </View>

                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.orderTotal}>
                      {formatMoney(Number(item.total ?? item.subtotal ?? 0), item.currency ?? "EGP")}
                    </Text>

                    <View style={[styles.pill, { backgroundColor: pill.bg, borderColor: pill.border }]}>
                      <Text style={[styles.pillText, { color: pill.fg }]}>{String(item.status ?? "pending")}</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            )
          }}
        />
      )}

      <SheetModal visible={!!selected} onClose={closeOrder}>
        {!selected ? null : (
          <ScrollView style={{ maxHeight: 680 }} contentContainerStyle={{ paddingBottom: 16 }}>
            <View style={styles.sheetHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.sheetTitle}>Order #{selected.id.slice(0, 8).toUpperCase()}</Text>
                <Text style={styles.muted}>{formatDate(selected.createdAt)}</Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.sheetTotal}>
                  {formatMoney(Number(selected.total ?? selected.subtotal ?? 0), selected.currency ?? "EGP")}
                </Text>
                <Text style={styles.muted}>Total</Text>
              </View>
            </View>

            {/* Status editor */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Status</Text>
              <Text style={styles.mutedSmall}>Tap a status to update the order in Firestore.</Text>

              <View style={styles.statusRow}>
                {STATUS_OPTIONS.map((s) => {
                  const active = String(selected.status ?? "pending").toLowerCase() === s
                  const pill = statusPillStyle(s)
                  return (
                    <Pressable
                      key={s}
                      onPress={() => setStatus(s)}
                      disabled={savingStatus || deleting}
                      style={({ pressed }) => [
                        styles.statusChip,
                        {
                          borderColor: active ? "#FF6B6B" : pill.border,
                          backgroundColor: active ? "rgba(255,107,107,0.12)" : "#fff",
                        },
                        pressed && { opacity: 0.9 },
                        (savingStatus || deleting) && { opacity: 0.6 },
                      ]}
                    >
                      <Text style={{ fontWeight: "800", color: active ? "#FF6B6B" : "#111827", fontSize: 12 }}>
                        {s}
                      </Text>
                    </Pressable>
                  )
                })}
              </View>

              {savingStatus ? (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 }}>
                  <ActivityIndicator />
                  <Text style={styles.muted}>Saving…</Text>
                </View>
              ) : null}
            </View>

            {/* Shipping */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Shipping address</Text>

              {addrLoading ? (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8 }}>
                  <ActivityIndicator />
                  <Text style={styles.muted}>Loading shipping…</Text>
                </View>
              ) : !address ? (
                <View style={styles.emptyBox}>
                  <Text style={styles.muted}>No address found in orders/{selected.id}/shipping/address</Text>
                </View>
              ) : (
                <View style={styles.infoBox}>
                  <Text style={styles.infoLine}>
                    <Text style={styles.infoKey}>Name: </Text>
                    {address.fullName ?? "—"}
                  </Text>
                  <Text style={styles.infoLine}>
                    <Text style={styles.infoKey}>Phone: </Text>
                    {address.phone ?? "—"}
                  </Text>
                  <Text style={styles.infoLine}>
                    <Text style={styles.infoKey}>Email: </Text>
                    {address.email ?? "—"}
                  </Text>
                  <Text style={styles.infoLine}>
                    <Text style={styles.infoKey}>Street: </Text>
                    {address.streetAddress ?? "—"}
                  </Text>
                  <Text style={styles.infoLine}>
                    <Text style={styles.infoKey}>Building/Floor/Apt: </Text>
                    {address.building ?? "—"} / {address.floor ?? "—"} / {address.apartment ?? "—"}
                  </Text>
                  <Text style={styles.infoLine}>
                    <Text style={styles.infoKey}>Area/City: </Text>
                    {address.area ?? "—"} / {address.city ?? "—"}
                  </Text>

                  {address.notes ? (
                    <>
                      <View style={styles.divider} />
                      <Text style={styles.infoLine}>
                        <Text style={styles.infoKey}>Notes: </Text>
                        {address.notes}
                      </Text>
                    </>
                  ) : null}
                </View>
              )}
            </View>

            {/* Items */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Items</Text>

              <View style={styles.infoBox}>
                {(selected.items ?? []).length === 0 ? (
                  <Text style={styles.muted}>No items stored on this order.</Text>
                ) : (
                  (selected.items ?? []).map((it, idx) => (
                    <View key={`${it.id}-${it.color ?? ""}-${it.size ?? ""}-${idx}`} style={styles.itemRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.itemName}>{it.name}</Text>
                        <Text style={styles.mutedSmall}>
                          {it.color ? `Color: ${it.color}` : ""}
                          {it.color && it.size ? " • " : ""}
                          {it.size ? `Size: ${it.size}` : ""}
                        </Text>
                      </View>
                      <View style={{ alignItems: "flex-end" }}>
                        <Text style={styles.itemQty}>x{Number(it.quantity ?? 0)}</Text>
                        <Text style={styles.mutedSmall}>
                          {formatMoney(Number(it.price ?? 0), selected.currency ?? "EGP")}
                        </Text>
                      </View>
                    </View>
                  ))
                )}
              </View>

              {/* DELETE BUTTON */}
              <Pressable
                onPress={onDeleteOrder}
                disabled={savingStatus || deleting}
                style={({ pressed }) => [
                  styles.deleteBtn,
                  pressed && { opacity: 0.9 },
                  (savingStatus || deleting) && { opacity: 0.6 },
                ]}
              >
                {deleting ? <ActivityIndicator /> : null}
                <Text style={styles.deleteBtnText}>Delete order & restock</Text>
              </Pressable>

              <Text style={[styles.mutedSmall, { marginTop: 8 }]}>
                This will remove the order from Firestore and return all quantities back to product stockBySize.
              </Text>
            </View>
          </ScrollView>
        )}
      </SheetModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 16 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 },
  title: { fontSize: 26, fontWeight: "900", color: "#111827" },
  subtitle: { marginTop: 4, color: "#6B7280", fontWeight: "600" },

  kpiRow: { flexDirection: "row", gap: 10, marginBottom: 14 },
  kpiCard: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F0F0F4",
    backgroundColor: "#FAFAFB",
  },
  kpiLabel: { color: "#6B7280", fontWeight: "800", fontSize: 12 },
  kpiValue: { fontSize: 20, fontWeight: "900", marginTop: 6, color: "#111827" },

  center: { paddingVertical: 30, alignItems: "center", gap: 10 },

  card: {
    borderWidth: 1,
    borderColor: "#F0F0F4",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  sheetHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 },
  sheetTitle: { fontSize: 18, fontWeight: "900", color: "#111827" },
  sheetTotal: { fontSize: 18, fontWeight: "900", color: "#111827" },

  section: { paddingHorizontal: 16, paddingBottom: 14 },
  sectionTitle: { fontSize: 14, fontWeight: "900", color: "#111827" },

  statusRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  statusChip: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#fff",
  },

  infoBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F0F0F4",
    backgroundColor: "#FAFAFB",
  },
  emptyBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F0F0F4",
    backgroundColor: "#fff",
  },

  infoLine: { color: "#111827", fontWeight: "600", marginBottom: 6 },
  infoKey: { fontWeight: "900" },
  divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 10 },

  itemRow: { flexDirection: "row", justifyContent: "space-between", gap: 12, paddingVertical: 10 },
  itemName: { fontWeight: "900", color: "#111827" },
  itemQty: { fontWeight: "900", color: "#111827" },

  orderId: { fontWeight: "900", marginBottom: 4, color: "#111827" },
  orderTotal: { fontWeight: "900", fontSize: 16, marginBottom: 8, color: "#111827" },

  pill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, borderWidth: 1 },
  pillText: { fontWeight: "900", fontSize: 11 },

  muted: { color: "#6B7280" },
  mutedSmall: { color: "#6B7280", fontSize: 12, marginTop: 4 },

  deleteBtn: {
    marginTop: 14,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  deleteBtnText: { color: "white", fontWeight: "900" },
})
