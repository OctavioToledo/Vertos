import { negocio } from '../lib/datos'
import { textoEstado } from '../lib/horario'
import { useEstadoNegocio } from '../lib/useEstadoNegocio'
import { linkWhatsApp } from '../lib/whatsapp'
import { IconoWhatsApp } from './Iconos'

export function Hero() {
  const estado = useEstadoNegocio()

  return (
    <section id="inicio" className="mx-auto max-w-5xl px-4 pt-28 pb-14 md:pt-36 md:pb-20">
      <h1 className="estampar max-w-3xl font-slab text-titulo leading-[1.05] md:text-titulo-lg">
        Panchos a la masa, <span className="text-ketchup">hechos en casa.</span>
      </h1>
      <p className="mt-5 max-w-xl text-xl">
        Masa casera, salchicha y un montón de gustos. Pedí por WhatsApp y retiralo o te lo llevamos en San Martín.
      </p>

      <p
        className={`mt-6 inline-flex items-center gap-2 rounded-full border-2 border-plancha px-4 py-1.5 font-semibold ${
          estado.abierto ? 'bg-mostaza' : 'bg-blanco'
        }`}
      >
        <span className={`size-2.5 rounded-full ${estado.abierto ? 'bg-ketchup' : 'bg-plancha/50'}`} aria-hidden />
        {textoEstado(estado)}
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <a href="#menu" className="boton boton-primario text-xl">
          Ver el menú
        </a>
        <a href={linkWhatsApp(negocio.whatsapp, `Hola ${negocio.nombre}! Quiero hacer un pedido`)} target="_blank" rel="noopener noreferrer" className="boton boton-claro text-xl">
          <IconoWhatsApp />
          Pedir por WhatsApp
        </a>
      </div>
    </section>
  )
}
