"use client"

import { Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"

function PaymobReturnContent() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    // Paymob usually returns query params like success, txn_response_code, etc.
    // You can customize this logic later. For now, we just route safely.
    const success = params.get("success")
    const orderId = params.get("orderId") || params.get("merchant_order_id") || params.get("order_id")

    if (success === "true" && orderId) {
      router.replace(`/checkout/success?orderId=${encodeURIComponent(orderId)}`)
      return
    }

    if (orderId) {
      router.replace(`/checkout/failed?orderId=${encodeURIComponent(orderId)}`)
      return
    }

    router.replace("/checkout/failed")
  }, [params, router])

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <p className="text-foreground/70">Finalizing your payment…</p>
    </main>
  )
}

export default function PaymobReturnPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <main className="min-h-screen flex items-center justify-center px-4">
          <p className="text-foreground/70">Loading…</p>
        </main>
      }>
        <PaymobReturnContent />
      </Suspense>
      <Footer />
      <CartDrawer />
    </>
  )
}
