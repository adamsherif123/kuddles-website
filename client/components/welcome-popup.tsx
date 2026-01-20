'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { addSubscriber } from '@/lib/subscribers.firestore'

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('kuddles-popup-seen')
    if (!hasSeenPopup) {
      // Show popup after 1 second delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('kuddles-popup-seen', 'true')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await addSubscriber(email.trim())
      setIsSubmitted(true)
      localStorage.setItem('kuddles-popup-seen', 'true')
      setTimeout(() => {
        setIsOpen(false)
      }, 2000)
    } catch (error: any) {
      console.error('Error adding subscriber:', error)
      setSubmitError('Failed to subscribe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pattern background */}
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/images/pattern.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Decorative elephant sticker - top right */}
        <div className="absolute -top-8 -right-8 w-32 h-32 opacity-15 z-0">
          <Image
            src="/images/stickers-03.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          className="absolute top-4 right-4 z-20 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close popup"
          type="button"
        >
          <X className="h-5 w-5 text-foreground/60 hover:text-foreground" />
        </button>

        <div className="p-8 space-y-5 relative z-10">
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-foreground font-display">
              Your first tote's on us
            </h2>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Get your exclusive Kuddles tote bag with your first order—enter your email to get started.
            </p>
          </div>

          {isSubmitted ? (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 bg-[var(--brand-coral)]/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">✓</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground">All set!</h3>
                <p className="text-sm text-foreground/70">
                  Check your email for your exclusive discount code.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {submitError}
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setSubmitError(null)
                    }}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-coral)]/50 focus:border-transparent placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="w-full bg-[var(--brand-coral)] hover:bg-[var(--brand-coral)]/90 text-white font-semibold rounded-xl h-11 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Subscribing...' : 'Claim My Tote'}
                </Button>
              </form>

              {/* Footer text */}
              <p className="text-xs text-center text-foreground/50">
                We'll never spam you. Just good stuff.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
