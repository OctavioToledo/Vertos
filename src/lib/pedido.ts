import { formatoPrecio } from './formato'

export interface LineaPedido {
  nombre: string
  cantidad: number
  precio: number
  aclaracion: string
}

export interface DatosPedido {
  nombre: string
  entrega: string
  direccion: string
  pago: string
  abonaCon: string
  comentarios: string
}

export function totalPedido(lineas: LineaPedido[]): number {
  return lineas.reduce((suma, l) => suma + l.precio * l.cantidad, 0)
}

export function esDelivery(entrega: string): boolean {
  return entrega.toLowerCase() === 'delivery'
}

export function esEfectivo(pago: string): boolean {
  return pago.toLowerCase() === 'efectivo'
}

export function armarMensaje(nombreNegocio: string, lineas: LineaPedido[], datos: DatosPedido): string {
  const out: string[] = [`¡Hola ${nombreNegocio}! Quiero hacer un pedido 🌭`, '']

  for (const l of lineas) {
    out.push(`• ${l.cantidad}x ${l.nombre} — ${formatoPrecio(l.precio * l.cantidad)}`)
    if (l.aclaracion.trim()) out.push(`   (${l.aclaracion.trim()})`)
  }

  out.push('', `Total: ${formatoPrecio(totalPedido(lineas))}`, '')
  out.push(`Nombre: ${datos.nombre.trim()}`)
  out.push(`Entrega: ${datos.entrega}`)
  if (esDelivery(datos.entrega)) out.push(`Dirección: ${datos.direccion.trim()}`)

  const monto = Number(datos.abonaCon.replace(/\D/g, ''))
  const vuelto = esEfectivo(datos.pago) && monto > 0 ? ` (abono con ${formatoPrecio(monto)})` : ''
  out.push(`Pago: ${datos.pago}${vuelto}`)

  if (datos.comentarios.trim()) out.push(`Comentarios: ${datos.comentarios.trim()}`)
  if (esDelivery(datos.entrega)) out.push('', '(El costo de envío lo coordinamos por acá)')

  return out.join('\n')
}
