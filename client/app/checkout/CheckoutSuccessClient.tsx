"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Heart, MessageCircle } from "lucide-react"
import Image from "next/image"

type OrderStatus = "created" | "paid" | "failed" | "cash_on_delivery" | "cod" | string

export function CheckoutSuccessClient() {
  const params = useSearchParams()
  const orderId = params.get("orderId")

  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<OrderStatus>("created")
  const [orderDate, setOrderDate] = useState<Date | null>(null)
  const [orderNumber, setOrderNumber] = useState<string>("")

  useEffect(() => {
    ;(async () => {
      if (!orderId) {
        setLoading(false)
        setStatus("failed")
        return
      }

      try {
        const snap = await getDoc(doc(db, "orders", orderId))
        if (!snap.exists()) {
          setStatus("failed")
          setLoading(false)
          return
        }

        const data: any = snap.data()
        const orderStatus = (data.paymentStatus || data.status || "created") as OrderStatus
        setStatus(orderStatus)

        if (orderId) {
          const year = new Date().getFullYear()
          const shortId = orderId.substring(0, 6).toUpperCase()
          setOrderNumber(`#KUD${year}${shortId}`)
        }

        if (data.createdAt) {
          const ts = data.createdAt
          if (ts?.toDate) setOrderDate(ts.toDate())
          else if (ts?.seconds) setOrderDate(new Date(ts.seconds * 1000))
          else setOrderDate(new Date())
        } else {
          setOrderDate(new Date())
        }
      } catch {
        setStatus("failed")
      } finally {
        setLoading(false)
      }
    })()
  }, [orderId])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-foreground/70">Loading order status…</p>
        </main>
        <Footer />
        <CartDrawer />
      </>
    )
  }

  if (status === "failed" || !orderId) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-xl text-center space-y-6">
            <h1 className="text-4xl font-bold">Order Not Found</h1>
            <p className="text-foreground/70">
              We couldn't find your order. Please contact support if this is an error.
            </p>
            <Button asChild size="lg" className="bg-[var(--brand-coral)] text-white">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
        <CartDrawer />
      </>
    )
  }

  const formattedDate = orderDate
    ? orderDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : ""

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-4 py-12 relative">
        <div className="absolute top-20 right-10 w-40 h-40 opacity-10 hidden lg:block">
          <Image src="/images/stickers-03.png" alt="decorative" fill className="object-contain" />
        </div>

        <div className="max-w-2xl w-full text-center space-y-12">
          <div className="flex justify-center">
            <div className="relative w-24 h-24 bg-[var(--brand-coral)] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-14 h-14 text-white" />
            </div>
          </div>

          <div>
            <h1 className="text-5xl font-bold">Order Confirmed!</h1>
            <p className="text-xl text-foreground/70 mt-4">
              Your order has been successfully placed.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow border space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-foreground/60">Order Number</p>
                <p className="text-2xl font-bold">{orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Order Date</p>
                <p className="text-2xl font-bold">{formattedDate}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Status</p>
                <span className="inline-block mt-1 px-4 py-2 rounded-full bg-[var(--brand-coral)]/10 text-[var(--brand-coral)]">
                  Processing
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Button asChild variant="outline">
              <Link href="/care-guide">Care Guide</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/support">Support</Link>
            </Button>
          </div>

          <Button asChild size="lg" className="bg-[var(--brand-coral)] text-white">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </>
  )
}
