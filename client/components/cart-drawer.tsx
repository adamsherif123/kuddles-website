"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { CartLineItem } from "@/components/cart-line-item"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, subtotal } = useCart()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col"
          >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold">Shopping Cart ({items.length})</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button asChild onClick={() => setIsCartOpen(false)}>
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <CartLineItem key={`${item.id}-${item.color}-${item.size}-${index}`} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} EGP</span>
            </div>
            <Button
              asChild
              size="lg"
              className="w-full bg-[var(--brand-coral)] hover:bg-[var(--brand-coral)]/90 text-white"
              onClick={() => setIsCartOpen(false)}
            >
              <Link href="/cart">View Cart & Checkout</Link>
            </Button>
          </div>
        )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
