import { useCarrito } from '../carrito/Carrito'
import { formatoPrecio } from '../lib/formato'
import { IconoCarrito } from './Iconos'

/** Barra flotante inferior en mobile cuando hay productos en el pedido. */
export function BarraPedido() {
  const { cantidadTotal, total, abrir, abierto } = useCarrito()
  if (cantidadTotal === 0 || abierto) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <button type="button" onClick={abrir} className="boton boton-primario w-full justify-between py-3 text-xl">
        <span className="inline-flex items-center gap-2">
          <IconoCarrito />
          Ver pedido
          <span className="rounded-full bg-mostaza px-2 font-slab text-base text-plancha">{cantidadTotal}</span>
        </span>
        <span className="font-slab">{formatoPrecio(total)}</span>
      </button>
    </div>
  )
}
