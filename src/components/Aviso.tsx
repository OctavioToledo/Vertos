import { useCarrito } from '../carrito/Carrito'

/** Toast corto ("Agregado: Pancho fugazza"). La región viva existe siempre para que los lectores de pantalla la anuncien. */
export function Aviso() {
  const { aviso } = useCarrito()
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-40 flex justify-center px-4">
      {aviso && (
        <p key={aviso.id} className="saltar rounded-lg border-2 border-plancha bg-plancha px-4 py-2 font-semibold text-papel shadow-dura-oscura">
          {aviso.texto}
        </p>
      )}
    </div>
  )
}
