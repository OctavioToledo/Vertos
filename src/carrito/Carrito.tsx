import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from 'react'
import { buscarProducto } from '../lib/datos'
import type { LineaPedido } from '../lib/pedido'
import type { Producto } from '../lib/tipos'

interface ItemCarrito {
  id: string
  cantidad: number
  aclaracion: string
}

type Accion =
  | { tipo: 'sumar'; id: string }
  | { tipo: 'restar'; id: string }
  | { tipo: 'eliminar'; id: string }
  | { tipo: 'aclarar'; id: string; texto: string }
  | { tipo: 'vaciar' }

const CLAVE = 'vertos-carrito'

function reducer(items: ItemCarrito[], accion: Accion): ItemCarrito[] {
  switch (accion.tipo) {
    case 'sumar':
      return items.some((i) => i.id === accion.id)
        ? items.map((i) => (i.id === accion.id ? { ...i, cantidad: i.cantidad + 1 } : i))
        : [...items, { id: accion.id, cantidad: 1, aclaracion: '' }]
    case 'restar':
      return items
        .map((i) => (i.id === accion.id ? { ...i, cantidad: i.cantidad - 1 } : i))
        .filter((i) => i.cantidad > 0)
    case 'eliminar':
      return items.filter((i) => i.id !== accion.id)
    case 'aclarar':
      return items.map((i) => (i.id === accion.id ? { ...i, aclaracion: accion.texto } : i))
    case 'vaciar':
      return []
  }
}

/** Lee lo guardado y descarta productos que ya no existen en el menú. */
function cargar(): ItemCarrito[] {
  try {
    const crudo = JSON.parse(localStorage.getItem(CLAVE) ?? '[]')
    if (!Array.isArray(crudo)) return []
    return crudo.filter(
      (i): i is ItemCarrito =>
        typeof i?.id === 'string' &&
        Number.isInteger(i.cantidad) &&
        i.cantidad > 0 &&
        typeof i.aclaracion === 'string' &&
        buscarProducto(i.id) !== undefined,
    )
  } catch {
    return []
  }
}

export interface LineaCarrito extends LineaPedido {
  producto: Producto
}

interface ValorCarrito {
  lineas: LineaCarrito[]
  cantidadTotal: number
  total: number
  cantidadDe: (id: string) => number
  sumar: (id: string) => void
  restar: (id: string) => void
  eliminar: (id: string) => void
  aclarar: (id: string, texto: string) => void
  vaciar: () => void
  abierto: boolean
  abrir: () => void
  cerrar: () => void
  aviso: { texto: string; id: number } | null
  avisar: (texto: string) => void
}

const Contexto = createContext<ValorCarrito | null>(null)

export function ProveedorCarrito({ children }: { children: ReactNode }) {
  const [items, despachar] = useReducer(reducer, undefined, cargar)
  const [abierto, setAbierto] = useState(false)
  const [aviso, setAviso] = useState<{ texto: string; id: number } | null>(null)
  const timerAviso = useRef<number | undefined>(undefined)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items))
    } catch {
      // Sin almacenamiento (modo privado, cuota llena): el carrito sigue andando en memoria.
    }
  }, [items])

  // Estables: el drawer depende de `cerrar` en un efecto y no debe re-ejecutarse al cambiar el carrito.
  const abrir = useCallback(() => setAbierto(true), [])
  const cerrar = useCallback(() => setAbierto(false), [])

  const avisar = useCallback((texto: string) => {
    setAviso({ texto, id: Date.now() })
    window.clearTimeout(timerAviso.current)
    timerAviso.current = window.setTimeout(() => setAviso(null), 2200)
  }, [])

  const valor = useMemo<ValorCarrito>(() => {
    const lineas = items.flatMap((i) => {
      const producto = buscarProducto(i.id)
      return producto
        ? [{ producto, nombre: producto.nombre, precio: producto.precio, cantidad: i.cantidad, aclaracion: i.aclaracion }]
        : []
    })
    return {
      lineas,
      cantidadTotal: lineas.reduce((s, l) => s + l.cantidad, 0),
      total: lineas.reduce((s, l) => s + l.cantidad * l.precio, 0),
      cantidadDe: (id) => items.find((i) => i.id === id)?.cantidad ?? 0,
      sumar: (id) => despachar({ tipo: 'sumar', id }),
      restar: (id) => despachar({ tipo: 'restar', id }),
      eliminar: (id) => despachar({ tipo: 'eliminar', id }),
      aclarar: (id, texto) => despachar({ tipo: 'aclarar', id, texto }),
      vaciar: () => despachar({ tipo: 'vaciar' }),
      abierto,
      abrir,
      cerrar,
      aviso,
      avisar,
    }
  }, [items, abierto, aviso, avisar, abrir, cerrar])

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>
}

// eslint-disable-next-line react/only-export-components
export function useCarrito(): ValorCarrito {
  const valor = useContext(Contexto)
  if (!valor) throw new Error('useCarrito tiene que usarse dentro de <ProveedorCarrito>')
  return valor
}
