import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useCarrito } from '../carrito/Carrito'
import { negocio } from '../lib/datos'
import { formatoPrecio } from '../lib/formato'
import { armarMensaje, esDelivery, esEfectivo, type DatosPedido } from '../lib/pedido'
import { useEstadoNegocio } from '../lib/useEstadoNegocio'
import { linkWhatsApp } from '../lib/whatsapp'
import { IconoCerrar, IconoMas, IconoMenos, IconoTacho, IconoWhatsApp } from './Iconos'

type Errores = Partial<Record<'nombre' | 'entrega' | 'direccion' | 'pago', string>>

const VACIO: DatosPedido = { nombre: '', entrega: '', direccion: '', pago: '', abonaCon: '', comentarios: '' }

function validar(d: DatosPedido): Errores {
  const e: Errores = {}
  if (!d.nombre.trim()) e.nombre = 'Ingresá tu nombre'
  if (!d.entrega) e.entrega = 'Elegí cómo querés recibir el pedido'
  if (esDelivery(d.entrega) && !d.direccion.trim()) e.direccion = 'Ingresá la dirección para el delivery'
  if (!d.pago) e.pago = 'Elegí cómo vas a pagar'
  return e
}

const FOCUSABLES = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

const claseCampo =
  'mt-1 block min-h-11 w-full rounded-md border-2 border-plancha bg-blanco px-3 py-2 text-base aria-[invalid=true]:border-ketchup'

function MensajeError({ id, texto }: { id: string; texto?: string }) {
  if (!texto) return null
  return (
    <p id={id} className="mt-1 text-sm font-semibold text-ketchup">
      {texto}
    </p>
  )
}

function Opciones({ nombre, leyenda, opciones, valor, error, onChange }: {
  nombre: 'entrega' | 'pago'
  leyenda: string
  opciones: string[]
  valor: string
  error?: string
  onChange: (v: string) => void
}) {
  return (
    <fieldset aria-describedby={error ? `error-${nombre}` : undefined}>
      <legend className="font-semibold">{leyenda}</legend>
      <div className="mt-1 flex flex-wrap gap-2">
        {opciones.map((o) => (
          <label
            key={o}
            className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md border-2 border-plancha bg-blanco px-4 font-semibold hover:bg-mostaza/40 has-checked:bg-mostaza has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-plancha"
          >
            <input type="radio" name={nombre} value={o} checked={valor === o} onChange={() => onChange(o)} className="size-4 accent-plancha" data-campo={nombre} />
            {o}
          </label>
        ))}
      </div>
      <MensajeError id={`error-${nombre}`} texto={error} />
    </fieldset>
  )
}

function Campo({ id, etiqueta, opcional, error, children }: { id: string; etiqueta: string; opcional?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {etiqueta} {opcional && <span className="font-normal">(opcional)</span>}
      </label>
      {children}
      <MensajeError id={`error-${id}`} texto={error} />
    </div>
  )
}

export function DrawerPedido() {
  const carrito = useCarrito()
  const { lineas, total, abierto, cerrar } = carrito
  const estado = useEstadoNegocio()
  const panel = useRef<HTMLDivElement>(null)
  const botonCerrar = useRef<HTMLButtonElement>(null)
  const [datos, setDatos] = useState<DatosPedido>(VACIO)
  const [errores, setErrores] = useState<Errores>({})
  const [enviado, setEnviado] = useState(false)

  // Foco atrapado, cierre con Escape, scroll de fondo bloqueado y foco devuelto al cerrar.
  useEffect(() => {
    if (!abierto) return
    const previo = document.activeElement as HTMLElement | null
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    botonCerrar.current?.focus()

    const alTeclear = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        ev.preventDefault()
        cerrar()
        return
      }
      if (ev.key !== 'Tab' || !panel.current) return
      const focos = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLES)].filter((el) => el.offsetParent !== null)
      if (focos.length === 0) return
      const primero = focos[0]
      const ultimo = focos[focos.length - 1]
      if (ev.shiftKey && document.activeElement === primero) {
        ev.preventDefault()
        ultimo.focus()
      } else if (!ev.shiftKey && document.activeElement === ultimo) {
        ev.preventDefault()
        primero.focus()
      }
    }
    document.addEventListener('keydown', alTeclear)
    return () => {
      document.removeEventListener('keydown', alTeclear)
      document.body.style.overflow = overflowPrevio
      // Si el botón que abrió el drawer ya no existe (la barra flotante se oculta), el foco vuelve al carrito del header.
      const destino = previo?.isConnected && previo !== document.body ? previo : document.getElementById('boton-carrito')
      destino?.focus()
    }
  }, [abierto, cerrar])

  if (!abierto) return null

  const cambiar = <K extends keyof DatosPedido>(campo: K, valor: DatosPedido[K]) => {
    setDatos((d) => ({ ...d, [campo]: valor }))
    if (errores[campo as keyof Errores]) setErrores((e) => ({ ...e, [campo]: undefined }))
  }

  const enviar = (ev: FormEvent) => {
    ev.preventDefault()
    const nuevos = validar(datos)
    setErrores(nuevos)
    const primero = (['nombre', 'entrega', 'direccion', 'pago'] as const).find((c) => nuevos[c])
    if (primero) {
      panel.current?.querySelector<HTMLElement>(`[data-campo="${primero}"]`)?.focus()
      return
    }
    const mensaje = armarMensaje(negocio.nombre, lineas, datos)
    window.open(linkWhatsApp(negocio.whatsapp, mensaje), '_blank', 'noopener,noreferrer')
    setEnviado(true)
  }

  const vaciar = () => {
    carrito.vaciar()
    setEnviado(false)
    setDatos(VACIO)
    cerrar()
  }

  const delivery = esDelivery(datos.entrega)

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-stretch md:justify-end">
      <div className="absolute inset-0 bg-plancha/60" onClick={cerrar} aria-hidden />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-titulo"
        className="panel-drawer relative flex max-h-[92dvh] w-full flex-col rounded-t-2xl border-t-2 border-plancha bg-papel md:max-h-none md:w-[28rem] md:rounded-none md:border-t-0 md:border-l-2"
      >
        <div className="flex items-center justify-between border-b-2 border-plancha px-4 py-3">
          <h2 id="drawer-titulo" className="font-slab text-titulo-sm">
            Tu pedido
          </h2>
          <button ref={botonCerrar} type="button" onClick={cerrar} className="grid size-11 place-items-center rounded-md hover:bg-mostaza" aria-label="Cerrar pedido">
            <IconoCerrar />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">
          {!estado.abierto && (
            <p className="mb-5 rounded-md border-2 border-plancha bg-mostaza px-4 py-3 font-semibold">
              Ahora estamos cerrados. Podés dejar tu pedido y te respondemos cuando abramos.
            </p>
          )}

          {lineas.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-xl">Todavía no agregaste nada.</p>
              <a href="#menu" onClick={cerrar} className="mt-5 boton boton-primario">
                Ver el menú
              </a>
            </div>
          ) : enviado ? (
            <div className="flex flex-col gap-4 py-4">
              <p className="font-slab text-xl">¡Listo! Se abrió WhatsApp con tu pedido.</p>
              <p>Si ya lo mandaste, podés vaciar el carrito. Si volviste sin enviarlo, tu pedido sigue acá.</p>
              <button type="button" onClick={vaciar} className="boton boton-primario">
                Vaciar carrito
              </button>
              <button type="button" onClick={() => setEnviado(false)} className="boton boton-claro">
                Volver al pedido
              </button>
            </div>
          ) : (
            <>
              <ul className="flex flex-col gap-4">
                {lineas.map(({ producto, cantidad, aclaracion }) => (
                  <li key={producto.id} className="rounded-lg border-2 border-plancha bg-blanco p-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold leading-snug">{producto.nombre}</p>
                      <p className="font-slab whitespace-nowrap">{formatoPrecio(producto.precio * cantidad)}</p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-md border-2 border-plancha" role="group" aria-label={`Cantidad de ${producto.nombre}`}>
                        <button type="button" onClick={() => carrito.restar(producto.id)} className="grid size-11 place-items-center hover:bg-mostaza" aria-label={`Quitar uno de ${producto.nombre}`}>
                          <IconoMenos />
                        </button>
                        <span className="min-w-8 text-center font-slab" aria-live="polite">
                          {cantidad}
                        </span>
                        <button type="button" onClick={() => carrito.sumar(producto.id)} className="grid size-11 place-items-center hover:bg-mostaza" aria-label={`Agregar otro ${producto.nombre}`}>
                          <IconoMas />
                        </button>
                      </div>
                      <button type="button" onClick={() => carrito.eliminar(producto.id)} className="grid size-11 place-items-center rounded-md hover:bg-ketchup hover:text-blanco" aria-label={`Eliminar ${producto.nombre}`}>
                        <IconoTacho />
                      </button>
                    </div>
                    <label htmlFor={`aclaracion-${producto.id}`} className="sr-only">
                      Aclaración para {producto.nombre}
                    </label>
                    <input
                      id={`aclaracion-${producto.id}`}
                      type="text"
                      value={aclaracion}
                      onChange={(e) => carrito.aclarar(producto.id, e.target.value)}
                      placeholder="Aclaración (ej. sin cebolla)"
                      maxLength={120}
                      className="mt-2 block min-h-11 w-full rounded-md border-2 border-plancha/30 bg-papel px-3 text-sm focus:border-plancha"
                    />
                  </li>
                ))}
              </ul>

              <p className="mt-5 flex items-baseline justify-between border-t-2 border-dashed border-plancha pt-4">
                <span className="text-xl font-semibold">Total</span>
                <span className="sello">{formatoPrecio(total)}</span>
              </p>
              {delivery && <p className="mt-2 text-sm">{negocio.notaDelivery}</p>}

              <form onSubmit={enviar} noValidate className="mt-8 flex flex-col gap-5">
                <Campo id="nombre" etiqueta="Nombre" error={errores.nombre}>
                  <input
                    id="nombre"
                    data-campo="nombre"
                    type="text"
                    autoComplete="name"
                    value={datos.nombre}
                    onChange={(e) => cambiar('nombre', e.target.value)}
                    aria-invalid={!!errores.nombre}
                    aria-describedby={errores.nombre ? 'error-nombre' : undefined}
                    className={claseCampo}
                  />
                </Campo>

                <Opciones nombre="entrega" leyenda="Entrega" opciones={negocio.entrega} valor={datos.entrega} error={errores.entrega} onChange={(v) => cambiar('entrega', v)} />

                {delivery && (
                  <Campo id="direccion" etiqueta="Dirección y referencia" error={errores.direccion}>
                    <textarea
                      id="direccion"
                      data-campo="direccion"
                      rows={2}
                      autoComplete="street-address"
                      value={datos.direccion}
                      onChange={(e) => cambiar('direccion', e.target.value)}
                      placeholder="Calle, número y alguna referencia"
                      aria-invalid={!!errores.direccion}
                      aria-describedby={errores.direccion ? 'error-direccion' : undefined}
                      className={claseCampo}
                    />
                  </Campo>
                )}

                <Opciones nombre="pago" leyenda="Pago" opciones={negocio.pagos} valor={datos.pago} error={errores.pago} onChange={(v) => cambiar('pago', v)} />

                {esEfectivo(datos.pago) && (
                  <Campo id="abona-con" etiqueta="¿Con cuánto abonás?" opcional>
                    <input
                      id="abona-con"
                      type="text"
                      inputMode="numeric"
                      value={datos.abonaCon}
                      onChange={(e) => cambiar('abonaCon', e.target.value)}
                      placeholder="Para llevarte el cambio"
                      className={claseCampo}
                    />
                  </Campo>
                )}

                <Campo id="comentarios" etiqueta="Comentarios" opcional>
                  <textarea id="comentarios" rows={2} value={datos.comentarios} onChange={(e) => cambiar('comentarios', e.target.value)} className={claseCampo} />
                </Campo>

                <button type="submit" className="boton boton-primario py-3 text-xl">
                  <IconoWhatsApp />
                  Enviar pedido por WhatsApp
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
