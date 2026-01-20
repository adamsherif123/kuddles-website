import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Card } from "@/components/ui/card"
import { Droplets, Wind, Shirt, AlertCircle, Heart, Icon as Iron } from "lucide-react"
import Image from "next/image"

export default function CareGuidePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--brand-coral)]/20 via-background to-background py-20">
          {/* Decorative sticker */}
          <div className="absolute -top-20 -right-20 w-64 h-64 opacity-10 hidden lg:block">
            <Image
              src="/images/stickers-03.png"
              alt="decorative"
              fill
              className="object-contain"
            />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
            <div>
              <span className="inline-block text-[var(--brand-coral)] font-semibold text-sm uppercase tracking-wider mb-4">
                ♥ Made with Love
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
                Care Guide
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 text-pretty leading-relaxed max-w-2xl mx-auto mt-6">
                Keep your Kuddles looking fresh and beautiful for years to come. Here's how to care for your cuddles.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Our Promise */}
            <div className="mb-16 p-8 bg-gradient-to-br from-[var(--brand-blue-light)]/20 to-[var(--brand-coral)]/10 rounded-2xl border border-[var(--brand-blue-light)]">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Promise to You</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                We care deeply about quality and your experience with Kuddles. That's why we've created this care guide to help you keep your products in perfect condition. With proper care, your Kuddles will be a cherished companion for years to come.
              </p>
            </div>

            {/* Washing Care */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--brand-blue-light)]/20 rounded-full flex items-center justify-center">
                  <Droplets className="h-6 w-6 text-[var(--brand-blue-medium)]" />
                </div>
                Washing Care
              </h2>

              <div className="space-y-4">
                <Card className="p-6 border-l-4 border-l-[var(--brand-blue-medium)]">
                  <h3 className="font-bold text-foreground mb-2">✓ Turn inside out before washing</h3>
                  <p className="text-foreground/70">
                    This protects your prints and helps maintain the fabric's vibrant colors and quality.
                  </p>
                </Card>

                <Card className="p-6 border-l-4 border-l-[var(--brand-blue-medium)]">
                  <h3 className="font-bold text-foreground mb-2">✓ Use cold water (30°C or below)</h3>
                  <p className="text-foreground/70">
                    Cold water is gentler on fabrics and prevents shrinking or color fading.
                  </p>
                </Card>

                <Card className="p-6 border-l-4 border-l-[var(--brand-blue-medium)]">
                  <h3 className="font-bold text-foreground mb-2">✓ Choose a gentle cycle</h3>
                  <p className="text-foreground/70">
                    Wash with similar colors only. Keep washing time to 15–20 minutes for best results.
                  </p>
                </Card>

                <Card className="p-6 border-l-4 border-l-[var(--brand-coral)]">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-[var(--brand-coral)]" />
                    Things to AVOID
                  </h3>
                  <ul className="space-y-2 text-foreground/70">
                    <li className="flex gap-3">
                      <span className="text-[var(--brand-coral)]">•</span>
                      <span>Do not use bleach or harsh detergents</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[var(--brand-coral)]">•</span>
                      <span>Avoid fabric softener—it can affect print and fabric quality</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[var(--brand-coral)]">•</span>
                      <span>Avoid excessive rubbing against rough surfaces</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>

            {/* Drying */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--brand-blue-light)]/20 rounded-full flex items-center justify-center">
                  <Wind className="h-6 w-6 text-[var(--brand-blue-medium)]" />
                </div>
                Drying Instructions
              </h2>

              <div className="space-y-4">
                <Card className="p-6 border-l-4 border-l-[var(--brand-blue-medium)]">
                  <h3 className="font-bold text-foreground mb-2">✓ Air dry in a shaded area</h3>
                  <p className="text-foreground/70">
                    Lay flat or hang gently to maintain shape. This is the gentlest drying method.
                  </p>
                </Card>

                <Card className="p-6 border-l-4 border-l-[var(--brand-coral)]">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-[var(--brand-coral)]" />
                    Never use a tumble dryer
                  </h3>
                  <p className="text-foreground/70">
                    Keep away from direct sunlight, which may cause fading over time.
                  </p>
                </Card>

                <div className="p-4 bg-[var(--brand-blue-light)]/10 rounded-lg border border-[var(--brand-blue-light)]">
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold text-foreground">Note:</span> Slight shrinkage of 1–2 cm after washing is normal and expected.
                  </p>
                </div>
              </div>
            </div>

            {/* Ironing */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--brand-blue-light)]/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
                Ironing Care
              </h2>

              <Card className="p-6 space-y-4">
                <div className="flex gap-3">
                  <CheckIcon />
                  <div>
                    <h3 className="font-bold text-foreground">Iron inside out on low temperature</h3>
                    <p className="text-foreground/70">This protects your prints and maintains fabric integrity.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <XIcon />
                  <div>
                    <h3 className="font-bold text-foreground">Do not iron directly on the print</h3>
                    <p className="text-foreground/70">Avoid high heat settings.</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* General Care */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--brand-blue-light)]/20 rounded-full flex items-center justify-center">
                  <Shirt className="h-6 w-6 text-[var(--brand-blue-medium)]" />
                </div>
                Handling & Wear
              </h2>

              <Card className="p-6 space-y-6">
                <div>
                  <h3 className="font-bold text-foreground mb-2">Encourage Gentle Wear</h3>
                  <p className="text-foreground/70">
                    Gentle wear keeps the fabric and prints looking fresh. Treat your Kuddles with love, just as they do for you!
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-2">Storage Tips</h3>
                  <ul className="space-y-2 text-foreground/70">
                    <li className="flex gap-3">
                      <span className="text-[var(--brand-blue-medium)]">•</span>
                      <span>Store in a cool, dry place away from direct sunlight</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[var(--brand-blue-medium)]">•</span>
                      <span>Keep away from moisture and humidity</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[var(--brand-blue-medium)]">•</span>
                      <span>Store plushies in a breathable bag if not in use</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* Footer Message */}
            <div className="p-8 bg-gradient-to-br from-[var(--brand-coral)]/10 to-[var(--brand-blue-light)]/10 rounded-2xl border border-[var(--brand-coral)]/20 text-center">
              <Heart className="h-8 w-8 text-[var(--brand-coral)] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-3">Made with Love, Care with Kindness</h3>
              <p className="text-foreground/70 leading-relaxed">
                Follow these simple care guidelines, and your Kuddles will remain a cherished companion for years. We're here to help if you have any questions about caring for your products!
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

function CheckIcon() {
  return (
    <div className="flex-shrink-0">
      <div className="w-6 h-6 rounded-full bg-[var(--brand-blue-medium)]/20 flex items-center justify-center">
        <span className="text-[var(--brand-blue-medium)] font-bold">✓</span>
      </div>
    </div>
  )
}

function XIcon() {
  return (
    <div className="flex-shrink-0">
      <div className="w-6 h-6 rounded-full bg-[var(--brand-coral)]/20 flex items-center justify-center">
        <span className="text-[var(--brand-coral)] font-bold">✕</span>
      </div>
    </div>
  )
}
