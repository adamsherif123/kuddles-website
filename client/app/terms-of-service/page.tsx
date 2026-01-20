import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Card } from "@/components/ui/card"
import { FileText, ShoppingCart, DollarSign, Truck, RotateCcw, AlertCircle, Lock, User } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Terms & Conditions | Kuddles",
  description: "Read Kuddles' Terms & Conditions to understand our policies and your responsibilities.",
}

export default function TermsOfServicePage() {
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

          {/* Decorative sticker */}
          <div className="absolute -bottom-12 -left-12 w-48 h-48 opacity-10 hidden lg:block">
            <Image src="/images/stickers-04.png" alt="" fill className="object-contain" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-block text-[var(--brand-coral)] font-semibold text-sm uppercase tracking-wider mb-4">
                Please Read Carefully
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance mb-6">
                Terms & Conditions
              </h1>
              <p className="text-lg text-foreground/70 text-pretty">
                By using Kuddles, you agree to these terms. Please read them thoroughly to understand your rights and responsibilities.
              </p>
              <p className="text-sm text-foreground/60 mt-4">Last updated: January 2026</p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              {/* Agreement to Terms */}
              <Card className="p-6 border border-[var(--brand-blue-light)] bg-gradient-to-br from-[var(--brand-blue-light)]/10 to-transparent">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--brand-coral)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-[var(--brand-coral)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Agreement to Terms</h3>
                    <p className="text-foreground/70">
                      By accessing or using the Kuddles website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Use of Website */}
              <Card className="p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--brand-blue-light)]/20 rounded-full flex items-center justify-center">
                    <Lock className="h-5 w-5 text-[var(--brand-blue-medium)]" />
                  </div>
                  Use of Website
                </h3>
                <p className="text-foreground/70">
                  You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the site.
                </p>
              </Card>

              {/* Products & Orders */}
              <Card className="p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--brand-coral)]/10 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-[var(--brand-coral)]" />
                  </div>
                  Products & Orders
                </h3>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-coral)] mt-1">•</span>
                    <span>All product descriptions and prices are subject to change without notice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-coral)] mt-1">•</span>
                    <span>We reserve the right to refuse or cancel any order</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-coral)] mt-1">•</span>
                    <span>Colors and images are displayed as accurately as possible but may vary slightly</span>
                  </li>
                </ul>
              </Card>

              {/* Pricing & Payments */}
              <Card className="p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--brand-blue-light)]/20 rounded-full flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-[var(--brand-blue-medium)]" />
                  </div>
                  Pricing & Payments
                </h3>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-blue-medium)] mt-1">•</span>
                    <span>Prices are listed in EGP unless stated otherwise</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-blue-medium)] mt-1">•</span>
                    <span>Payments must be completed before orders are shipped</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-blue-medium)] mt-1">•</span>
                    <span>We are not responsible for payment failures caused by third‑party providers</span>
                  </li>
                </ul>
              </Card>

              {/* Shipping & Delivery */}
              <Card className="p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--brand-coral)]/10 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-[var(--brand-coral)]" />
                  </div>
                  Shipping & Delivery
                </h3>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-coral)] mt-1">•</span>
                    <span>Estimated delivery times are provided but not guaranteed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-coral)] mt-1">•</span>
                    <span>Delays caused by couriers or external factors are not our responsibility</span>
                  </li>
                </ul>
              </Card>

              {/* Returns & Refunds */}
              <Card className="p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--brand-blue-light)]/20 rounded-full flex items-center justify-center">
                    <RotateCcw className="h-5 w-5 text-[var(--brand-blue-medium)]" />
                  </div>
                  Returns & Refunds
                </h3>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-blue-medium)] mt-1">•</span>
                    <span>Returns are accepted within 30 days of delivery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-blue-medium)] mt-1">•</span>
                    <span>Items must be unused and in original condition</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-blue-medium)] mt-1">•</span>
                    <span>Refunds will be processed after inspection</span>
                  </li>
                </ul>
              </Card>

              {/* Intellectual Property */}
              <Card className="p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3">Intellectual Property</h3>
                <p className="text-foreground/70">
                  All content on this website, including logos, images, designs, and text, is the property of Kuddles and may not be used without permission.
                </p>
              </Card>

              {/* Limitation of Liability */}
              <Card className="p-6 border border-border bg-red-50/30">
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Limitation of Liability
                </h3>
                <p className="text-foreground/70">
                  Kuddles is not liable for any indirect or consequential damages arising from the use of our website or products.
                </p>
              </Card>

              {/* Account Responsibility */}
              <Card className="p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--brand-coral)]/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-[var(--brand-coral)]" />
                  </div>
                  Account Responsibility
                </h3>
                <p className="text-foreground/70">
                  You are responsible for maintaining the confidentiality of your account information and all activities under your account.
                </p>
              </Card>

              {/* Additional Terms */}
              <div className="space-y-4">
                <Card className="p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-2">Termination</h3>
                  <p className="text-foreground/70">
                    We reserve the right to suspend or terminate access to our services at any time if these terms are violated.
                  </p>
                </Card>

                <Card className="p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-2">Governing Law</h3>
                  <p className="text-foreground/70">
                    These Terms & Conditions are governed by the laws of Egypt.
                  </p>
                </Card>

                <Card className="p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-2">Changes to Terms</h3>
                  <p className="text-foreground/70">
                    We may update these Terms & Conditions at any time. Continued use of the website constitutes acceptance of the updated terms.
                  </p>
                </Card>
              </div>

              {/* Contact Section */}
              <Card className="p-8 bg-gradient-to-br from-[var(--brand-coral)]/5 to-[var(--brand-blue-light)]/5 border border-[var(--brand-coral)]/20">
                <h3 className="text-2xl font-bold text-foreground mb-4">Questions About Our Terms?</h3>
                <p className="text-foreground/70 mb-4">
                  If you have questions regarding these Terms & Conditions, please contact us at:
                </p>
                <a href="mailto:support@kuddles.com" className="text-[var(--brand-coral)] font-semibold hover:underline">
                  support@kuddles.com
                </a>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
