import { formatoPrecio } from '../lib/formato'
import type { Producto } from '../lib/tipos'
import { ControlCantidad } from './ControlCantidad'
import { FotoProducto } from './FotoProducto'

/** El cartel de chapa: fondo kétchup, nombres en mostaza, precios en sello. */
export function CartelPanchos({ id, titulo, bajada, productos }: { id: string; titulo: string; bajada?: string; productos: Producto[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="sobre-rojo bg-ketchup text-blanco">
      <div className="mx-auto max-w-5xl px-4 py-14 md:py-20">
        <h2 id={`${id}-titulo`} className="font-slab text-titulo leading-tight text-mostaza [text-shadow:3px_3px_0_var(--color-ketchup-oscuro)] md:text-titulo-lg">
          {titulo}
        </h2>
        {bajada && <p className="mt-3 max-w-xl text-xl">{bajada}</p>}

        <ul className="mt-10 grid gap-x-10 md:grid-cols-2">
          {productos.map((p) => (
            <li key={p.id} className="flex gap-4 border-b-2 border-dashed border-blanco/40 py-6">
              <FotoProducto producto={p} className="w-20 md:w-24" />
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
                  <h3 className="font-slab text-nombre leading-tight text-mostaza">{p.nombre}</h3>
                  <span className="sello">{formatoPrecio(p.precio)}</span>
                </div>
                {p.ingredientes && <p className="leading-snug">{p.ingredientes}</p>}
                <div>
                  <ControlCantidad producto={p} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
