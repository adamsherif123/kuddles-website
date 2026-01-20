import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Card } from "@/components/ui/card"
import { Truck, MapPin, Clock } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Shipping Policy | Kuddles",
  description: "Learn about Kuddles' shipping times and delivery information for Cairo, Alexandria, and other governorates.",
}

export default function ShippingPolicyPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-[var(--brand-blue-light)]/30 via-background to-background overflow-hidden">
          {/* Pattern background */}
          <div className="absolute inset-0 opacity-5">
            <Image src="/images/pattern.png" alt="" fill className="object-cover" />
          </div>

          {/* Decorative elephant sticker */}
          <div className="absolute -top-12 -right-8 w-40 h-40 opacity-10 hidden md:block">
            <Image
              src="/images/stickers-04.png"
              alt="decorative"
              fill
              className="object-contain"
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-block mb-4">
                <span className="inline-block bg-[var(--brand-coral)]/10 text-[var(--brand-coral)] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Delivery Information
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance font-display">
                Shipping Policy
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed text-pretty">
                We're committed to getting your Kuddles order to you quickly and safely. Here's how our shipping works across Egypt.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              {/* Cairo & Alexandria */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3 font-display">
                  <div className="w-12 h-12 bg-[var(--brand-coral)]/10 rounded-full flex items-center justify-center">
                    <Truck className="h-6 w-6 text-[var(--brand-coral)]" />
                  </div>
                  Cairo & Alexandria
                </h2>

                <Card className="p-8 border-2 border-[var(--brand-coral)]/20 rounded-2xl bg-gradient-to-br from-[var(--brand-coral)]/5 to-transparent">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[var(--brand-coral)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-2 font-display">
                        2-5 Working Days
                      </h3>
                      <p className="text-foreground/70 leading-relaxed">
                        Orders placed in Cairo and Alexandria ship within 2-5 working days. We ensure fast, reliable delivery to get your Kuddles cuddlies to you as quickly as possible.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Other Governorates */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3 font-display">
                  <div className="w-12 h-12 bg-[var(--brand-blue-medium)]/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-[var(--brand-blue-medium)]" />
                  </div>
                  Other Governorates
                </h2>

                <Card className="p-8 border-2 border-[var(--brand-blue-medium)]/20 rounded-2xl bg-gradient-to-br from-[var(--brand-blue-medium)]/5 to-transparent">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[var(--brand-blue-medium)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-2 font-display">
                        3-8 Working Days
                      </h3>
                      <p className="text-foreground/70 leading-relaxed">
                        Orders shipping to other governorates across Egypt arrive within 3-8 working days. We work with trusted delivery partners to ensure your package arrives safe and sound.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Important Info */}
              <div className="bg-[var(--brand-blue-light)]/10 rounded-2xl p-8 border border-[var(--brand-blue-light)]/30">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2 font-display">
                  <span className="text-2xl">✨</span>
                  Important Information
                </h3>

                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="text-[var(--brand-coral)] font-bold flex-shrink-0">•</span>
                    <span className="text-foreground/80">
                      <strong>Working days:</strong> Shipping times are calculated from the next working day after your order is placed (weekends and holidays excluded).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--brand-coral)] font-bold flex-shrink-0">•</span>
                    <span className="text-foreground/80">
                      <strong>Processing:</strong> We inspect and pack every order with care to ensure it arrives in perfect condition.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--brand-coral)] font-bold flex-shrink-0">•</span>
                    <span className="text-foreground/80">
                      <strong>Tracking:</strong> Once your order ships, you'll receive a tracking number via email.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--brand-coral)] font-bold flex-shrink-0">•</span>
                    <span className="text-foreground/80">
                      <strong>Packaging:</strong> Your Kuddles come beautifully packaged and ready for gift-giving.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Need Help */}
              <div className="mt-16 p-8 rounded-2xl border-2 border-[var(--brand-coral)]/20 bg-gradient-to-br from-[var(--brand-coral)]/5 to-transparent text-center">
                <h3 className="text-xl font-bold text-foreground mb-2 font-display">
                  Questions About Your Order?
                </h3>
                <p className="text-foreground/70 mb-6">
                  Our Support Hub is here to help with any questions about your shipment.
                </p>
                <a
                  href="/support"
                  className="inline-block bg-[var(--brand-coral)] hover:bg-[var(--brand-coral)]/90 text-white font-semibold px-6 py-3 rounded-full transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
