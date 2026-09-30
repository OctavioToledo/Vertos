import type { Producto } from '../lib/tipos'
import { IlustracionPancho } from './Iconos'

export function FotoProducto({ producto, className = '' }: { producto: Producto; className?: string }) {
  const clases = `aspect-square shrink-0 overflow-hidden rounded-md border-2 border-plancha bg-papel object-cover ${className}`
  if (!producto.foto) return <IlustracionPancho className={clases} width={96} height={96} />
  return <img src={producto.foto} alt={producto.nombre} width={96} height={96} loading="lazy" decoding="async" className={clases} />
}
