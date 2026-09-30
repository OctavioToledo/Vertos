const numero = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 })

/** 6500 → "$6.500" */
export function formatoPrecio(valor: number): string {
  return `$${numero.format(valor)}`
}
