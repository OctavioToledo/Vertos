import { describe, expect, it } from 'vitest'
import negocio from '../data/negocio.json'
import { estadoNegocio, textoDias, textoEstado } from './horario'

// Mendoza es UTC-3 todo el año. 2026-09-28 es lunes.
const en = (iso: string) => estadoNegocio(new Date(`${iso}-03:00`), negocio)

describe('estadoNegocio', () => {
  it('martes 23:00 está cerrado', () => {
    expect(en('2026-09-29T23:00:00').abierto).toBe(false)
  })

  it('lunes 00:15 está abierto (sigue el turno del domingo)', () => {
    expect(en('2026-09-28T00:15:00').abierto).toBe(true)
  })

  it('lunes 00:31 está cerrado', () => {
    expect(en('2026-09-28T00:31:00').abierto).toBe(false)
  })

  it('lunes 00:30 en punto ya cerró', () => {
    expect(en('2026-09-28T00:30:00').abierto).toBe(false)
  })

  it('miércoles 20:29 está cerrado', () => {
    expect(en('2026-09-30T20:29:00').abierto).toBe(false)
  })

  it('miércoles 20:30 está abierto', () => {
    expect(en('2026-09-30T20:30:00').abierto).toBe(true)
  })

  it('miércoles 00:15 está cerrado (el martes no abre)', () => {
    expect(en('2026-09-30T00:15:00').abierto).toBe(false)
  })

  it('jueves 00:15 está abierto (sigue el turno del miércoles)', () => {
    expect(en('2026-10-01T00:15:00').abierto).toBe(true)
  })

  it('usa la hora de Mendoza aunque la fecha venga en otra zona', () => {
    // 23:45 UTC del miércoles = 20:45 en Mendoza
    expect(estadoNegocio(new Date('2026-09-30T23:45:00Z'), negocio).abierto).toBe(true)
  })
})

describe('textoEstado', () => {
  it('abierto muestra hasta cuándo', () => {
    expect(textoEstado(en('2026-09-30T21:00:00'))).toBe('Abierto ahora · hasta las 00:30')
  })

  it('martes a la noche anuncia el miércoles', () => {
    expect(textoEstado(en('2026-09-29T23:00:00'))).toBe('Cerrado · abrimos el miércoles a las 20:30')
  })

  it('lunes 00:31 anuncia el miércoles', () => {
    expect(textoEstado(en('2026-09-28T00:31:00'))).toBe('Cerrado · abrimos el miércoles a las 20:30')
  })

  it('miércoles a la tarde dice hoy', () => {
    expect(textoEstado(en('2026-09-30T18:00:00'))).toBe('Cerrado · abrimos hoy a las 20:30')
  })
})

describe('textoDias', () => {
  it('agrupa días seguidos aunque crucen el fin de semana', () => {
    expect(textoDias([3, 4, 5, 6, 0])).toBe('Miércoles a domingo')
  })
  it('lista días sueltos', () => {
    expect(textoDias([5, 1, 3])).toBe('Lunes, miércoles y viernes')
  })
  it('un solo día', () => {
    expect(textoDias([6])).toBe('Sábado')
  })
})
