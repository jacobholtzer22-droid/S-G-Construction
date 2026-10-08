'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * The only JavaScript added for motion. One IntersectionObserver per element,
 * disconnected the moment it fires, so nothing stays subscribed to scroll.
 *
 * Safety: the hidden-until-revealed CSS in globals.css is scoped to
 * `html.js .reveal`, and the `js` class is set by a one-line inline script in
 * app/layout.tsx. With JavaScript off the class is never added, the rule never
 * matches, and every section renders plainly visible. Nothing in the hero uses
 * this: the headline, the phone number and the estimate button are never
 * hidden and never wait on a script.
 *
 * prefers-reduced-motion is handled in CSS, not here.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  /** Stagger inside a grid, in ms. Keep it small. */
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li'
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      el.setAttribute('data-shown', 'true')
      return
    }
    const show = () => {
      el.setAttribute('data-shown', 'true')
      io.disconnect()
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // `|| top < 0` matters: on a fast fling the observer can report an
          // element only AFTER it has left the top of the viewport, with
          // isIntersecting already false. Without this it would stay invisible
          // until the page was scrolled back up.
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) show()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    // Anything already at or above the fold on load reveals straight away,
    // so a deep link or a restored scroll position never lands on blank space.
    if (el.getBoundingClientRect().top < window.innerHeight) show()
    return () => io.disconnect()
  }, [])

  return (
    // @ts-expect-error -- Tag is a narrow union of intrinsic elements
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  )
}
