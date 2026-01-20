import { Suspense } from "react"
import { CheckoutSuccessClient } from "./CheckoutSuccessClient"

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-foreground/70">Loading checkout…</p>
        </div>
      }
    >
      <CheckoutSuccessClient />
    </Suspense>
  )
}
