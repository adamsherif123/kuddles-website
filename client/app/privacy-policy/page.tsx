import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Card } from "@/components/ui/card"
import { Shield, Lock, Eye, Users, Zap } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Privacy Policy | Kuddles",
  description: "Learn how Kuddles protects your personal information and privacy.",
}

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      subsections: [
        {
          heading: "Personal Information",
          items: ["Full name", "Email address", "Phone number", "Shipping and billing address", "Payment-related information (processed securely via third‑party providers)"],
        },
        {
          heading: "Non‑Personal Information",
          items: ["Browser type and device information", "IP address", "Pages visited and time spent on the website", "Cookies and usage data"],
        },
      ],
    },
    {
      icon: Zap,
      title: "How We Use Your Information",
      items: [
        "Process and fulfill orders",
        "Communicate with you about your orders",
        "Improve our website and user experience",
        "Provide customer support",
        "Send important updates related to your purchase or account",
        "Prevent fraud and ensure platform security",
      ],
    },
    {
      icon: Lock,
      title: "Payment Information",
      description:
        "All payments are handled through secure third‑party payment gateways. Kuddles does not store or have access to your full payment details.",
    },
    {
      icon: Shield,
      title: "Data Security",
      description:
        "We take reasonable technical and organizational measures to protect your data. However, no method of transmission over the internet is 100% secure.",
    },
    {
      icon: Users,
      title: "Data Sharing",
      description:
        "We do not sell or rent your personal information. We may share data only with payment providers, shipping partners, and essential service providers. All partners are required to keep your information confidential.",
    },
  ]

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
          <div className="absolute -top-12 -right-12 w-48 h-48 opacity-10 hidden lg:block">
            <Image src="/images/stickers-03.png" alt="" fill className="object-contain" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-block text-[var(--brand-coral)] font-semibold text-sm uppercase tracking-wider mb-4">
                Your Trust Matters
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance mb-6">
                Privacy Policy
              </h1>
              <p className="text-lg text-foreground/70 text-pretty">
                Learn how we collect, use, and protect your information. Your privacy is very important to us.
              </p>
              <p className="text-sm text-foreground/60 mt-4">Last updated: January 2026</p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-12">
              {/* Information We Collect */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--brand-coral)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Eye className="h-6 w-6 text-[var(--brand-coral)]" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-6">Information We Collect</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">Personal Information</h3>
                        <ul className="space-y-2 text-foreground/70">
                          <li className="flex items-start gap-3">
                            <span className="text-[var(--brand-coral)] mt-1">•</span>
                            <span>Full name</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[var(--brand-coral)] mt-1">•</span>
                            <span>Email address</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[var(--brand-coral)] mt-1">•</span>
                            <span>Phone number</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[var(--brand-coral)] mt-1">•</span>
                            <span>Shipping and billing address</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[var(--brand-coral)] mt-1">•</span>
                            <span>Payment-related information (processed securely via third‑party payment providers)</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">Non‑Personal Information</h3>
                        <ul className="space-y-2 text-foreground/70">
                          <li className="flex items-start gap-3">
                            <span className="text-[var(--brand-coral)] mt-1">•</span>
                            <span>Browser type and device information</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[var(--brand-coral)] mt-1">•</span>
                            <span>IP address</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[var(--brand-coral)] mt-1">•</span>
                            <span>Pages visited and time spent on the website</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[var(--brand-coral)] mt-1">•</span>
                            <span>Cookies and usage data</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--brand-blue-light)]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-[var(--brand-blue-medium)]" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-6">How We Use Your Information</h2>
                    <ul className="space-y-3 text-foreground/70">
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--brand-blue-medium)] mt-1">•</span>
                        <span>Process and fulfill orders</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--brand-blue-medium)] mt-1">•</span>
                        <span>Communicate with you about your orders</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--brand-blue-medium)] mt-1">•</span>
                        <span>Improve our website and user experience</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--brand-blue-medium)] mt-1">•</span>
                        <span>Provide customer support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--brand-blue-medium)] mt-1">•</span>
                        <span>Send important updates related to your purchase or account</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[var(--brand-blue-medium)] mt-1">•</span>
                        <span>Prevent fraud and ensure platform security</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <Card className="p-6 border border-[var(--brand-blue-light)] bg-gradient-to-br from-[var(--brand-blue-light)]/10 to-transparent">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--brand-coral)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lock className="h-6 w-6 text-[var(--brand-coral)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Payment Information</h3>
                    <p className="text-foreground/70">
                      All payments are handled through secure third‑party payment gateways. Kuddles does not store or have access to your full payment details.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Other Important Sections */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Additional Information</h2>

                <Card className="p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">Cookies</h3>
                  <p className="text-foreground/70 mb-4">We use cookies to remember your preferences, analyze site traffic, and improve website performance. You may disable cookies in your browser settings, but some features may not function properly.</p>
                </Card>

                <Card className="p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">Data Security</h3>
                  <p className="text-foreground/70">
                    We take reasonable technical and organizational measures to protect your data. However, no method of transmission over the internet is 100% secure.
                  </p>
                </Card>

                <Card className="p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">Data Sharing</h3>
                  <p className="text-foreground/70 mb-3">
                    We do not sell or rent your personal information. We may share data only with:
                  </p>
                  <ul className="space-y-2 text-foreground/70">
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--brand-coral)]">•</span>
                      <span>Payment providers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--brand-coral)]">•</span>
                      <span>Shipping and logistics partners</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--brand-coral)]">•</span>
                      <span>Service providers essential to operating our platform</span>
                    </li>
                  </ul>
                  <p className="text-foreground/70 mt-4">All partners are required to keep your information confidential.</p>
                </Card>

                <Card className="p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">Children's Privacy</h3>
                  <p className="text-foreground/70">
                    Kuddles products are intended for children, but our website is managed by adults. We do not knowingly collect personal information from children under 13.
                  </p>
                </Card>

                <Card className="p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">Your Rights</h3>
                  <p className="text-foreground/70 mb-3">You have the right to:</p>
                  <ul className="space-y-2 text-foreground/70">
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--brand-blue-medium)]">•</span>
                      <span>Access your personal data</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--brand-blue-medium)]">•</span>
                      <span>Request corrections</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--brand-blue-medium)]">•</span>
                      <span>Request deletion of your data</span>
                    </li>
                  </ul>
                  <p className="text-foreground/70 mt-4">You can contact us to exercise these rights.</p>
                </Card>
              </div>

              {/* Contact Section */}
              <Card className="p-8 bg-gradient-to-br from-[var(--brand-coral)]/5 to-[var(--brand-blue-light)]/5 border border-[var(--brand-coral)]/20">
                <h3 className="text-2xl font-bold text-foreground mb-4">Questions?</h3>
                <p className="text-foreground/70 mb-4">
                  If you have questions about this Privacy Policy or our privacy practices, please contact us at:
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
