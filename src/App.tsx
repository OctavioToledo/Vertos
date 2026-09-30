import { ProveedorCarrito, useCarrito } from './carrito/Carrito'
import { Aviso } from './components/Aviso'
import { BarraPedido } from './components/BarraPedido'
import { CartelPanchos } from './components/CartelPanchos'
import { ComoPedir } from './components/ComoPedir'
import { DrawerPedido } from './components/DrawerPedido'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Mantel } from './components/Mantel'
import { Bebidas, Papas, Promos } from './components/Secciones'
import { menu } from './lib/datos'

function Pagina() {
  const { cantidadTotal } = useCarrito()
  return (
    <>
      <a href="#menu" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-blanco focus:p-3">
        Saltar al menú
      </a>
      <Header />
      <main>
        <Hero />
        <Mantel />
        <CartelPanchos id="menu" titulo="Panchos a la masa" bajada="Todos envueltos en masa casera, hechos en el momento." productos={menu.panchos} />
        <Promos />
        <Papas />
        <Bebidas />
        <ComoPedir />
      </main>
      <Mantel />
      <Footer />
      {/* Espacio para que la barra flotante no tape el footer en mobile */}
      {cantidadTotal > 0 && <div className="h-20 bg-plancha md:hidden" aria-hidden />}
      <BarraPedido />
      <DrawerPedido />
      <Aviso />
    </>
  )
}

export default function App() {
  return (
    <ProveedorCarrito>
      <Pagina />
    </ProveedorCarrito>
  )
}
