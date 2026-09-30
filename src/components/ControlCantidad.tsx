import { useEffect, useRef } from 'react'
import { useCarrito } from '../carrito/Carrito'
import type { Producto } from '../lib/tipos'
import { IconoMas, IconoMenos } from './Iconos'

/** Botón "Agregar" que, una vez en el carrito, se convierte en un selector – n +. */
export function ControlCantidad({ producto }: { producto: Producto }) {
  const { cantidadDe, sumar, restar, avisar } = useCarrito()
  const cantidad = cantidadDe(producto.id)
  const enfocar = useRef<'mas' | 'agregar' | null>(null)
  const refMas = useRef<HTMLButtonElement>(null)
  const refAgregar = useRef<HTMLButtonElement>(null)

  // Al cambiar de "Agregar" al selector (o al revés) el botón apretado desaparece:
  // se pasa el foco al control equivalente para no perderlo al navegar con teclado.
  useEffect(() => {
    if (enfocar.current === 'mas') refMas.current?.focus()
    if (enfocar.current === 'agregar') refAgregar.current?.focus()
    enfocar.current = null
  }, [cantidad])

  const agregar = () => {
    if (cantidad === 0) enfocar.current = 'mas'
    sumar(producto.id)
    avisar(`Agregado: ${producto.nombre}`)
  }

  const quitar = () => {
    if (cantidad === 1) enfocar.current = 'agregar'
    restar(producto.id)
  }

  if (cantidad === 0) {
    return (
      <button ref={refAgregar} type="button" onClick={agregar} className="boton boton-claro" aria-label={`Agregar ${producto.nombre}`}>
        <IconoMas />
        Agregar
      </button>
    )
  }

  return (
    <div className="inline-flex items-center rounded-lg border-2 border-plancha bg-blanco text-plancha shadow-dura" role="group" aria-label={`Cantidad de ${producto.nombre}`}>
      <button type="button" onClick={quitar} className="grid size-11 place-items-center rounded-l-md hover:bg-papel" aria-label={`Quitar uno de ${producto.nombre}`}>
        <IconoMenos />
      </button>
      <span className="min-w-8 text-center font-slab text-xl" aria-live="polite">
        {cantidad}
      </span>
      <button ref={refMas} type="button" onClick={agregar} className="grid size-11 place-items-center rounded-r-md hover:bg-papel" aria-label={`Agregar otro ${producto.nombre}`}>
        <IconoMas />
      </button>
    </div>
  )
}
