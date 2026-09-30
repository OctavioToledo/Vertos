import menuJson from '../data/menu.json'
import negocioJson from '../data/negocio.json'
import type { Menu, Negocio, Producto } from './tipos'

export const menu = menuJson as Menu
export const negocio = negocioJson as Negocio

const todos: Producto[] = [...menu.panchos, ...menu.papas, ...menu.promos, ...menu.bebidas]
const porId = new Map(todos.map((p) => [p.id, p]))

export function buscarProducto(id: string): Producto | undefined {
  return porId.get(id)
}
