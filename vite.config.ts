import { readFileSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
import { defineConfig, type Plugin } from 'vitest/config'

const DIAS_SCHEMA = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/**
 * Genera el JSON-LD de schema.org a partir de negocio.json (así los datos viven en un solo lugar)
 * y completa la URL absoluta de la imagen de Open Graph con VITE_SITE_URL.
 */
function seoNegocio(sitio: string): Plugin {
  return {
    name: 'vertos-seo',
    transformIndexHtml(html) {
      const negocio = JSON.parse(readFileSync(new URL('./src/data/negocio.json', import.meta.url), 'utf8'))
      const [calle, ...resto] = negocio.direccion.split(',').map((s: string) => s.trim())
      const datos = {
        '@context': 'https://schema.org',
        '@type': 'Restaurant',
        name: negocio.nombre,
        servesCuisine: ['Panchos a la masa', 'Hot dogs', 'Comida al paso'],
        telephone: `+${negocio.whatsapp}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: calle,
          addressLocality: resto[0],
          addressRegion: resto[1],
          addressCountry: 'AR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: negocio.coordenadas.lat,
          longitude: negocio.coordenadas.lng,
        },
        hasMap: `https://www.google.com/maps?q=${negocio.coordenadas.lat},${negocio.coordenadas.lng}`,
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: negocio.horarios.dias.map((d: number) => DIAS_SCHEMA[d]),
            opens: negocio.horarios.apertura,
            closes: negocio.horarios.cierre,
          },
        ],
        sameAs: [`https://www.instagram.com/${negocio.instagram}/`],
        paymentAccepted: negocio.pagos.join(', '),
      }
      const script = `<script type="application/ld+json">${JSON.stringify(datos)}</script>`
      return html.replaceAll('__SITE_URL__', sitio).replace('</head>', `    ${script}\n  </head>`)
    },
  }
}

export default defineConfig(({ mode }) => {
  const sitio = (loadEnv(mode, process.cwd()).VITE_SITE_URL ?? '').replace(/\/$/, '')
  return {
    plugins: [react(), tailwindcss(), seoNegocio(sitio)],
    test: {
      environment: 'node',
    },
  }
})
