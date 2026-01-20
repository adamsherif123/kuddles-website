"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { CartDrawer } from "@/components/cart-drawer"
import { ProductGrid } from "@/components/product-grid"
import type { Product } from "@/lib/products"
import { fetchProducts } from "@/lib/products.firestore"

import { Button } from "@/components/ui/button"

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    fetchProducts()
      .then((items) => {
        if (!mounted) return
        setProducts(items)
      })
      .catch((e) => {
        if (!mounted) return
        setError(e?.message ?? "Failed to load products")
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Shop All Products</h1>

          {/* Loading / Error */}
          {loading && (
            <div className="py-16 text-center text-muted-foreground">
              Loading products…
            </div>
          )}

          {!loading && error && (
            <div className="py-16 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} className="bg-[var(--brand-coral)] text-white">
                Retry
              </Button>
            </div>
          )}

          {!loading && !error && <ProductGrid products={products} />}
        </div>
      </main>

      <CartDrawer />
    </>
  )
}
