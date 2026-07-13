# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

Sitio web personal y blog de Marco Verón (`marcoveron.me`). Astro estático, en español,
desplegado en GitHub Pages. Diseño minimalista tipográfico con tema claro/oscuro.

## Comandos

```bash
npm run dev      # servidor de desarrollo (http://localhost:4321)
npm run build    # build de producción a dist/ (incluye sitemap y rss.xml)
npm run preview  # sirve el build de dist/ para verificarlo
npm run astro -- check   # comprobación de tipos/diagnósticos de Astro
```

No hay tests ni linter configurados. La validación real ocurre en `npm run build`:
el esquema de contenido (Zod) falla el build si algún frontmatter es inválido.

## Arquitectura

- **Astro 7**, salida 100% estática. Sin framework de UI ni CSS externo: los estilos son
  un único `src/styles/global.css` con variables CSS por tema.
- **Content Collections (Content Layer API)**: `src/content.config.ts` define dos
  colecciones, `blog` y `reflexiones`, ambas con el **mismo** esquema (`postSchema`) y
  cargadas con el `glob()` loader desde `src/content/{blog,reflexiones}/*.md`. Añadir un
  `.md` ahí = nueva entrada; no hay que tocar código.
- **API de contenido (Astro 5+/7)**: usar `getCollection`, `getEntry` y la función
  **`render(entry)`** importada de `astro:content` (no `entry.render()`). El identificador
  de cada entrada es **`entry.id`** (se usa para construir las URLs), no `slug`.
- **`src/utils.ts`** centraliza la lógica compartida: `getSortedPosts(collection)` ordena
  por fecha desc y **oculta borradores solo en producción** (`import.meta.env.PROD`), y
  `formatDate`/`isoDate` formatean fechas en español. Reutilízalo en vez de reimplementar.
- **Configuración editable por el usuario** (no técnica): `src/site.config.ts` (título,
  tagline, email, `socialLinks`, `navLinks`) y `src/projects.ts`. La bio está en
  `src/pages/sobre-mi.astro`. Cambios de identidad/menú van aquí, no dispersos.
- **Layouts**: `BaseLayout.astro` (head/SEO/OG, header con nav activa, footer, y el script
  inline anti-parpadeo de tema en el `<head>`); `PostLayout.astro` (envuelve BaseLayout
  para una entrada). El toggle de tema (`components/ThemeToggle.astro`) escribe
  `data-theme` en `<html>` y persiste en `localStorage`.

## Rutas

`src/pages/`: `index.astro`, `blog/index.astro` + `blog/[...slug].astro`, `reflexiones/`
(igual), `proyectos.astro`, `sobre-mi.astro`, `enlaces.astro`, `rss.xml.ts`, `404.astro`.
Las páginas dinámicas usan `getStaticPaths()` con `params.slug = post.id`.

## Despliegue

Push a `main` → GitHub Actions (`.github/workflows/deploy.yml`, `withastro/action` +
`actions/deploy-pages`) construye y publica en GitHub Pages. `public/CNAME` fija el dominio
`marcoveron.me`; el DNS está en Namecheap (ver README). `site` en `astro.config.mjs` debe
seguir siendo `https://marcoveron.me` (afecta a canonical, sitemap y RSS).

## Convenciones

- Todo el contenido e interfaz en **español**, con acentos correctos.
- Al añadir campos al frontmatter, actualiza `postSchema` en `src/content.config.ts` y la
  tabla de `CONTENIDO.md` (la guía de publicación del usuario).
- Mantén el diseño minimalista: reutiliza las variables CSS y clases existentes de
  `global.css` antes de añadir estilos nuevos.
