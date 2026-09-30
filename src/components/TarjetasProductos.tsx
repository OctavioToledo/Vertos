import { formatoPrecio } from '../lib/formato'
import type { Producto } from '../lib/tipos'
import { ControlCantidad } from './ControlCantidad'
import { FotoProducto } from './FotoProducto'

/** Tarjetas blancas con sombra dura para papas, promos y bebidas. */
export function TarjetasProductos({ productos }: { productos: Producto[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {productos.map((p) => (
        <li key={p.id} className="flex gap-4 rounded-lg border-2 border-plancha bg-blanco p-4 shadow-dura">
          <FotoProducto producto={p} className="w-20" />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
              <h3 className="font-slab text-xl leading-snug">{p.nombre}</h3>
              <span className="sello">{formatoPrecio(p.precio)}</span>
            </div>
            {p.ingredientes && <p className="leading-snug">{p.ingredientes}</p>}
            <div className="mt-auto">
              <ControlCantidad producto={p} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
