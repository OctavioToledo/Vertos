import { useCarrito } from '../carrito/Carrito'
import { negocio } from '../lib/datos'
import { IconoCarrito } from './Iconos'

export function Header() {
  const { cantidadTotal, abrir } = useCarrito()

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b-2 border-plancha bg-papel">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        {/* Placeholder de texto hasta tener el logo definitivo */}
        <a href="#inicio" className="font-slab text-titulo-sm leading-none text-ketchup">
          {negocio.nombre}
        </a>
        <button
          id="boton-carrito"
          type="button"
          onClick={abrir}
          className="boton boton-claro relative px-3"
          aria-label={cantidadTotal > 0 ? `Ver pedido, ${cantidadTotal} productos` : 'Ver pedido, vacío'}
        >
          <IconoCarrito />
          <span className="hidden sm:inline">Tu pedido</span>
          {cantidadTotal > 0 && (
            <span
              key={cantidadTotal}
              className="saltar absolute -top-3 -right-3 grid min-w-7 place-items-center rounded-full border-2 border-plancha bg-mostaza px-1.5 font-slab text-sm leading-6"
            >
              {cantidadTotal}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
