import { menu, negocio } from '../lib/datos'
import { linkWhatsApp } from '../lib/whatsapp'
import { IconoWhatsApp } from './Iconos'
import { TarjetasProductos } from './TarjetasProductos'

export function Promos() {
  if (menu.promos.length === 0) return null
  return (
    <section id="promos" aria-labelledby="promos-titulo" className="mx-auto max-w-5xl px-4 pt-16">
      <h2 id="promos-titulo" className="mb-8 font-slab text-titulo leading-tight">
        Promos
      </h2>
      <TarjetasProductos productos={menu.promos} />
    </section>
  )
}

export function Papas() {
  if (menu.papas.length === 0) return null
  return (
    <section id="papas" aria-labelledby="papas-titulo" className="mx-auto max-w-5xl px-4 pt-16">
      <h2 id="papas-titulo" className="mb-8 font-slab text-titulo leading-tight">
        Papas
      </h2>
      <TarjetasProductos productos={menu.papas} />
    </section>
  )
}

export function Bebidas() {
  return (
    <section id="bebidas" aria-labelledby="bebidas-titulo" className="mx-auto max-w-5xl px-4 pt-16">
      <h2 id="bebidas-titulo" className="mb-8 font-slab text-titulo leading-tight">
        Bebidas
      </h2>
      {menu.bebidas.length > 0 ? (
        <TarjetasProductos productos={menu.bebidas} />
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-lg border-2 border-plancha bg-blanco p-6 shadow-dura sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl">
            <span className="font-semibold">Consultá las bebidas del día.</span> Van cambiando, preguntanos qué hay.
          </p>
          <a
            href={linkWhatsApp(negocio.whatsapp, 'Hola! ¿Qué bebidas tienen hoy?')}
            target="_blank"
            rel="noopener noreferrer"
            className="boton boton-primario shrink-0"
          >
            <IconoWhatsApp />
            Preguntar
          </a>
        </div>
      )}
    </section>
  )
}
