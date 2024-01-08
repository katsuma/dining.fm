/* eslint-disable jsx-a11y/alt-text */
import type { MDXComponents } from 'mdx/types'
import React from 'react'
import Image, { ImageProps } from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <h2 className='title'>{children}</h2>,
    a: ({ children, ...props }) => (
      <a rel='noopener noreferrer' target='_blank' {...props}>
        {children}
      </a>
    ),
    img: (props) => (
      <Image
        width={600}
        height={400}
        priority={false}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        {...(props as ImageProps)}
      />
    ),
    ...components,
  }
}
