import { useEffect, useState } from 'react'
import { negocio } from './datos'
import { estadoNegocio, type EstadoNegocio } from './horario'

/** Estado abierto/cerrado, recalculado cada 30 segundos. */
export function useEstadoNegocio(): EstadoNegocio {
  const [estado, setEstado] = useState(() => estadoNegocio(new Date(), negocio))
  useEffect(() => {
    const id = window.setInterval(() => setEstado(estadoNegocio(new Date(), negocio)), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return estado
}
