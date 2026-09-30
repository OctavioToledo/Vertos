import type { ReactNode } from 'react'
import { negocio } from '../lib/datos'
import { textoDias } from '../lib/horario'
import { IconoBolsa, IconoMoto, IconoPago, IconoPin, IconoReloj } from './Iconos'

// Coordenadas exactas: la dirección sola hace que Google ubique mal el local.
const ubicacion = `${negocio.coordenadas.lat},${negocio.coordenadas.lng}`

function Dato({ icono, titulo, children }: { icono: ReactNode; titulo: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-plancha bg-mostaza">{icono}</div>
      <div>
        <h3 className="font-slab text-xl">{titulo}</h3>
        <div className="mt-1 leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

export function ComoPedir() {
  const { horarios } = negocio
  const tieneDelivery = negocio.entrega.some((e) => e.toLowerCase() === 'delivery')

  return (
    <section id="como-pedir" aria-labelledby="como-pedir-titulo" className="mx-auto max-w-5xl px-4 py-16 md:py-20">
      <h2 id="como-pedir-titulo" className="font-slab text-titulo leading-tight">
        Cómo pedir
      </h2>
      <p className="mt-3 max-w-xl text-xl">Armá tu pedido acá, mandalo por WhatsApp y te confirmamos al toque.</p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <Dato icono={<IconoReloj />} titulo="Horarios">
            <p>{textoDias(horarios.dias)}</p>
            <p>
              De {horarios.apertura} a {horarios.cierre}
            </p>
          </Dato>
          <Dato icono={tieneDelivery ? <IconoMoto /> : <IconoBolsa />} titulo="Entrega">
            <p>{negocio.entrega.join(' o ')}</p>
            {tieneDelivery && <p>{negocio.notaDelivery}</p>}
          </Dato>
          <Dato icono={<IconoPago />} titulo="Pagos">
            <p>{negocio.pagos.join(' o ')}</p>
          </Dato>
          <Dato icono={<IconoPin />} titulo="Dirección">
            <p>{negocio.direccion}</p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${ubicacion}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 boton boton-claro"
            >
              Cómo llegar
            </a>
          </Dato>
        </div>

        <iframe
          title={`Mapa: ${negocio.direccion}`}
          src={`https://www.google.com/maps?q=${ubicacion}&z=17&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="aspect-square w-full rounded-lg border-2 border-plancha shadow-dura md:aspect-auto md:h-full md:min-h-80"
        />
      </div>
    </section>
  )
}
