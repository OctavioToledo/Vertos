import { describe, expect, it } from 'vitest'
import { armarMensaje } from './pedido'

const lineas = [
  { nombre: 'Pancho fugazza', cantidad: 2, precio: 6500, aclaracion: '' },
  { nombre: 'Pancho 4 quesos', cantidad: 1, precio: 7000, aclaracion: 'sin aderezos' },
  { nombre: 'Cono de papas chico', cantidad: 1, precio: 3500, aclaracion: '  ' },
]

describe('armarMensaje', () => {
  it('arma el mensaje completo para delivery en efectivo', () => {
    const texto = armarMensaje("Verto's", lineas, {
      nombre: 'Juan',
      entrega: 'Delivery',
      direccion: 'San Martín 450, casa con rejas verdes',
      pago: 'Efectivo',
      abonaCon: '30000',
      comentarios: 'tocar timbre',
    })
    expect(texto).toBe(
      [
        "¡Hola Verto's! Quiero hacer un pedido 🌭",
        '',
        '• 2x Pancho fugazza — $13.000',
        '• 1x Pancho 4 quesos — $7.000',
        '   (sin aderezos)',
        '• 1x Cono de papas chico — $3.500',
        '',
        'Total: $23.500',
        '',
        'Nombre: Juan',
        'Entrega: Delivery',
        'Dirección: San Martín 450, casa con rejas verdes',
        'Pago: Efectivo (abono con $30.000)',
        'Comentarios: tocar timbre',
        '',
        '(El costo de envío lo coordinamos por acá)',
      ].join('\n'),
    )
  })

  it('take away con transferencia omite dirección, vuelto, comentarios y nota de envío', () => {
    const texto = armarMensaje("Verto's", lineas.slice(0, 1), {
      nombre: 'Ana',
      entrega: 'Take away',
      direccion: 'no debería aparecer',
      pago: 'Transferencia',
      abonaCon: '50000',
      comentarios: '',
    })
    expect(texto).toBe(
      [
        "¡Hola Verto's! Quiero hacer un pedido 🌭",
        '',
        '• 2x Pancho fugazza — $13.000',
        '',
        'Total: $13.000',
        '',
        'Nombre: Ana',
        'Entrega: Take away',
        'Pago: Transferencia',
      ].join('\n'),
    )
  })

  it('acepta el monto con puntos o signo pesos', () => {
    const texto = armarMensaje("Verto's", lineas.slice(0, 1), {
      nombre: 'Ana',
      entrega: 'Take away',
      direccion: '',
      pago: 'Efectivo',
      abonaCon: '$20.000',
      comentarios: '',
    })
    expect(texto).toContain('Pago: Efectivo (abono con $20.000)')
  })
})
