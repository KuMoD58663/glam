import React from 'react'

type Props = {
  src: string
  alt: string
  width?: number
  height?: number
  [key: string]: unknown
}

export default function Image({ src, alt, width, height }: Props) {
  return <img src={src} alt={alt} width={width} height={height} />
}
