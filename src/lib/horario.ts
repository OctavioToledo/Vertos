import type { Negocio } from './tipos'

export type EstadoNegocio =
  | { abierto: true; cierre: string }
  | { abierto: false; proximoDia: number; esHoy: boolean; apertura: string }

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
const DIA_CORTO: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

function aMinutos(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Día de la semana y minutos desde medianoche en la zona horaria del negocio. */
function horaLocal(fecha: Date, zonaHoraria: string) {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: zonaHoraria,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(fecha)
  const valor = (tipo: string) => partes.find((p) => p.type === tipo)?.value ?? ''
  return {
    dia: DIA_CORTO[valor('weekday')],
    minutos: Number(valor('hour')) * 60 + Number(valor('minute')),
  }
}

export function estadoNegocio(
  fecha: Date,
  negocio: Pick<Negocio, 'zonaHoraria' | 'horarios'>,
): EstadoNegocio {
  const { dias, apertura, cierre } = negocio.horarios
  const abre = aMinutos(apertura)
  const cierra = aMinutos(cierre)
  const cruzaMedianoche = cierra <= abre
  const { dia, minutos } = horaLocal(fecha, negocio.zonaHoraria)
  const diaAnterior = (dia + 6) % 7

  const abiertoPorHoy = dias.includes(dia) && minutos >= abre && (cruzaMedianoche || minutos < cierra)
  const abiertoPorAyer = cruzaMedianoche && dias.includes(diaAnterior) && minutos < cierra

  if (abiertoPorHoy || abiertoPorAyer) return { abierto: true, cierre }

  for (let i = 0; i < 7; i++) {
    const candidato = (dia + i) % 7
    if (dias.includes(candidato) && (i > 0 || minutos < abre)) {
      return { abierto: false, proximoDia: candidato, esHoy: i === 0, apertura }
    }
  }
  return { abierto: false, proximoDia: dia, esHoy: false, apertura }
}

export function textoEstado(estado: EstadoNegocio): string {
  if (estado.abierto) return `Abierto ahora · hasta las ${estado.cierre}`
  const cuando = estado.esHoy ? 'hoy' : `el ${DIAS[estado.proximoDia]}`
  return `Cerrado · abrimos ${cuando} a las ${estado.apertura}`
}

const mayuscula = (s: string) => s[0].toUpperCase() + s.slice(1)

/** [3,4,5,6,0] → "Miércoles a domingo"; [1,3,5] → "Lunes, miércoles y viernes". Semana de lunes a domingo. */
export function textoDias(dias: number[]): string {
  const orden = [...new Set(dias)].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7))
  const nombres = orden.map((d) => DIAS[d])
  const seguidos = orden.every((d, i) => i === 0 || (orden[i - 1] + 1) % 7 === d)
  if (orden.length >= 3 && seguidos) return mayuscula(`${nombres[0]} a ${nombres.at(-1)}`)
  if (nombres.length === 1) return mayuscula(nombres[0])
  return mayuscula(`${nombres.slice(0, -1).join(', ')} y ${nombres.at(-1)}`)
}
