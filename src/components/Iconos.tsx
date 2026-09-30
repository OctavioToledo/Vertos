import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
} as const

export function IconoBolsa(props: Props) {
  return (
    <svg {...base} width={24} height={24} {...props}>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  )
}

export function IconoMoto(props: Props) {
  return (
    <svg {...base} width={24} height={24} {...props}>
      <circle cx="5.5" cy="17" r="3" />
      <circle cx="18.5" cy="17" r="3" />
      <path d="M8.5 17h6l2-6h-5l-2 3H5" />
      <path d="M14 6h3l1.5 5" />
      <path d="M3 10h5" />
    </svg>
  )
}

export function IconoReloj(props: Props) {
  return (
    <svg {...base} width={24} height={24} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

export function IconoPin(props: Props) {
  return (
    <svg {...base} width={24} height={24} {...props}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}

export function IconoPago(props: Props) {
  return (
    <svg {...base} width={24} height={24} {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 9.5v5M18 9.5v5" />
    </svg>
  )
}

export function IconoPapas(props: Props) {
  return (
    <svg {...base} width={24} height={24} {...props}>
      <path d="M6 10l1.5 11h9L18 10" />
      <path d="M8 10 7 3M11 10V2M14 10l1-7M16.5 10 18 5" />
      <path d="M5 10h14" />
    </svg>
  )
}

export function IconoMas(props: Props) {
  return (
    <svg {...base} width={20} height={20} strokeWidth={3} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function IconoMenos(props: Props) {
  return (
    <svg {...base} width={20} height={20} strokeWidth={3} {...props}>
      <path d="M5 12h14" />
    </svg>
  )
}

export function IconoTacho(props: Props) {
  return (
    <svg {...base} width={20} height={20} {...props}>
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />
    </svg>
  )
}

export function IconoCerrar(props: Props) {
  return (
    <svg {...base} width={24} height={24} strokeWidth={2.5} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function IconoWhatsApp(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden focusable={false} {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  )
}

export function IconoInstagram(props: Props) {
  return (
    <svg {...base} width={24} height={24} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  )
}

/** Carrito de panchos visto de costado, para el botón del pedido. */
export function IconoCarrito(props: Props) {
  return (
    <svg {...base} width={24} height={24} {...props}>
      <path d="M2 4h3l2.2 10.5h11L20.5 7H6" />
      <circle cx="9" cy="19" r="1.6" />
      <circle cx="17" cy="19" r="1.6" />
    </svg>
  )
}

/** Ilustración de pancho a la masa en los colores de la marca, para cuando no hay foto. */
export function IlustracionPancho(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden focusable={false} {...props}>
      <rect width="120" height="120" fill="#FFFDF7" />
      <g transform="rotate(-18 60 60)" stroke="#1E1B18" strokeWidth="4" strokeLinejoin="round">
        {/* salchicha que asoma por las puntas */}
        <rect x="12" y="50" width="96" height="20" rx="10" fill="#C8202F" />
        {/* masa envuelta */}
        <path d="M24 44c10-6 62-6 72 0 4 5 4 27 0 32-10 6-62 6-72 0-4-5-4-27 0-32Z" fill="#F2B705" />
        {/* vueltas de la masa */}
        <path d="M42 42c-4 12-4 24 0 36M60 41c-4 13-4 25 0 38M78 42c-4 12-4 24 0 36" fill="none" strokeWidth="3" />
        {/* chorrito de ketchup */}
        <path d="M30 56c6-5 10 5 16 0s10 5 16 0 10 5 16 0 10 5 14 1" fill="none" stroke="#C8202F" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  )
}
