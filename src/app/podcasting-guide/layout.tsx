import React from 'react'

import '@/app/layout.css'

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <section className='section'>
    {children}
    </section>
  )
}
