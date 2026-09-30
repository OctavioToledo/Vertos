export interface Producto {
  id: string
  nombre: string
  ingredientes: string
  precio: number
  foto: string | null
}

export interface Menu {
  panchos: Producto[]
  papas: Producto[]
  promos: Producto[]
  bebidas: Producto[]
}

export interface Negocio {
  nombre: string
  whatsapp: string
  whatsappVisible: string
  instagram: string
  direccion: string
  zonaHoraria: string
  horarios: {
    /** 0 = domingo … 6 = sábado */
    dias: number[]
    apertura: string
    cierre: string
  }
  entrega: string[]
  pagos: string[]
  notaDelivery: string
}
