import { negocio } from '../lib/datos'
import { linkWhatsApp } from '../lib/whatsapp'
import { IconoInstagram, IconoPin, IconoWhatsApp } from './Iconos'

export function Footer() {
  return (
    <footer className="bg-plancha text-papel">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-slab text-titulo-sm text-mostaza">{negocio.nombre}</p>
          <p className="mt-2">Hecho en familia en San Martín, Mendoza.</p>
        </div>
        <ul className="flex flex-col gap-1">
          <li>
            <a href={`https://www.instagram.com/${negocio.instagram}/`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 hover:text-mostaza">
              <IconoInstagram />@{negocio.instagram}
            </a>
          </li>
          <li>
            <a href={linkWhatsApp(negocio.whatsapp, `Hola ${negocio.nombre}!`)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 hover:text-mostaza">
              <IconoWhatsApp />
              {negocio.whatsappVisible}
            </a>
          </li>
          <li className="inline-flex min-h-11 items-center gap-3">
            <IconoPin />
            {negocio.direccion}
          </li>
        </ul>
      </div>
    </footer>
  )
}
