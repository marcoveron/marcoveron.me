# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

Sitio web personal y blog de Marco Verón (`marcoveron.me`). Está construido sobre la
plantilla **[Astro Sidey](https://github.com/odhyp/astro-sidey)**: Astro estático, en
español, desplegado en GitHub Pages. Diseño minimalista y tipográfico, **tema único claro**
(paleta Flexoki tipo papel), con foco en la lectura.

## Comandos

```bash
npm run dev      # servidor de desarrollo con --host (http://localhost:4321)
npm run new      # crea una entrada nueva en src/content/writings/ (pregunta título, descripción, tags)
npm run build    # build de producción a dist/ (incluye sitemap y rss.xml)
npm run preview  # sirve el build de dist/ para verificarlo
```

No hay tests ni linter configurados (sí Prettier: `.prettierrc`). La validación real ocurre
en `npm run build`: el esquema de contenido (Zod) falla el build si algún frontmatter es
inválido, y `src/utils/parseConfig.ts` falla el arranque si `sidey.config.ts` es inválido.

## Arquitectura

- **Astro 6** + **Tailwind CSS 4** (vía `@tailwindcss/vite`, no PostCSS). Salida 100%
  estática. **No hay CSS suelto**: todo está en `src/styles/global.css`, que define la
  paleta **Flexoki** y las variables semánticas (estilo shadcn) más el `@theme` de Tailwind.
  Tipografía **Geist / Geist Mono** (paquetes `@fontsource-variable/*`).
- **Resaltado de código: Expressive Code** (`astro-expressive-code`), configurado en
  `ec.config.mjs` (tema `monokai`, números de línea y secciones plegables disponibles). No
  se usa Shiki directamente.
- **Iconos**: `astro-icon` con los sets `ph` (Phosphor) y `simple-icons`
  (`<Icon name="ph:..." />`).
- **MDX** habilitado: las entradas pueden ser `.md` o `.mdx` e importar componentes.
- **Content Collections (Content Layer API)**: `src/content.config.ts` define **dos**
  colecciones cargadas con el `glob()` loader:
  - **`pages`** (`src/content/pages/*.{md,mdx}`) — páginas sueltas. Esquema: `title`
    (obligatorio), `description?`, `draft` (por defecto `false`). Usa el layout `SinglePage`.
    **Mapeo de URL especial**: `home.mdx` → `/`; cualquier otro archivo → `/<nombre>`
    (p. ej. `about.mdx` → `/about`). Lo renderiza `src/pages/[...id].astro`.
  - **`writings`** (`src/content/writings/*.{md,mdx}`) — las entradas del blog. Esquema:
    `title`, `description?`, `date` (obligatorio, `YYYY-MM-DD`), `tags` (array, por defecto
    `[]`), `draft`. Usa el layout `WritingPage`. Cada archivo → `/writings/<nombre>`. El
    índice `/writings` se autogenera en `src/pages/writings/index.astro` (ordenado por fecha
    desc); las entradas las renderiza `src/pages/writings/[...id].astro`.
  - Añadir un archivo en esas carpetas = nueva página/entrada; **la carpeta es la URL**. No
    hay que tocar código. Lo más rápido para una entrada nueva es `npm run new`.
- **API de contenido (Astro 5+/6)**: usar `getCollection`, `getEntry` y **`render(entry)`**
  de `astro:content` (no `entry.render()`). El identificador de cada entrada es **`entry.id`**
  (el nombre del archivo sin extensión), y es lo que forma la URL.
- **`src/utils/`** centraliza la lógica compartida — **reutilízala** en vez de reimplementar:
  - `getContent.ts`: `getWritings()` (excluye borradores y ordena por fecha desc) y
    `getPages()`. El getter genérico `getContent(collection, { drafts, sort })` **excluye
    los borradores por defecto** (`draft: true` no aparece ni en dev ni en producción, salvo
    que pases `{ drafts: true }`).
  - `formatDate.ts`: `formatDate(date, style)` en `es-ES` y zona `UTC` (evita desfases de
    día). Estilos: `long` | `medium` | `short`.
  - `parseConfig.ts`: valida `sidey.config.ts` con Zod y lo exporta como **`config`** (alias
    `@parseConfig`). Si añades campos a `sideyConfig`, actualiza también su esquema aquí.
- **Configuración editable (no técnica)**: **`sidey.config.ts`** en la raíz es el archivo
  central. Contiene `site` (`title`, `description`, `url`, `author`, `locale`), `navigation`
  (menú) y `socialLinks` (pie de página y "Sobre mí"). Cambios de identidad/menú/enlaces van
  aquí. La bio está en `src/content/pages/about.mdx`.
- **Layouts y componentes**:
  - `src/layouts/BaseLayout.astro` envuelve todo: `<head>` (vía `components/layout/BaseHead.astro`
    con SEO/OG/canonical/favicon/RSS), la barra lateral `Sidebar.astro` (navegación), el
    `Footer.astro` (copyright + `socialLinks`) y el `Lightbox.astro`.
  - `src/layouts/pages/SinglePage.astro` (páginas) y `WritingPage.astro` (entradas, con fecha
    y tiempo de lectura) envuelven `BaseLayout`.
  - Componentes: `common/{Back,PostTags,Prose}`, `section/writings/WritingCard`, y para MDX
    `mdx/{Callout,Figure}` (importables dentro de `.mdx`).
  - Plugins: `plugins/remark-reading-time.mjs` (calcula "N min de lectura", en español) y
    `plugins/rehype-lightbox.mjs` (marca las `<img>` para el lightbox). Además rehype
    `slug`, `autolink-headings` y `external-links` (abre externos en pestaña nueva).
- **Alias de import (`tsconfig.json`)** — úsalos: `@/*`, `@config`, `@parseConfig`,
  `@components/*`, `@content/*`, `@layouts/*`, `@plugins/*`, `@utils/*`.
- **Tema**: es **único (claro)**. `global.css` incluye variables para un modo `.dark`, pero
  **no hay conmutador ni script que active la clase `.dark`** — es intencional. No
  reintroduzcas un toggle salvo que el usuario lo pida.

## Rutas

- `/` ← `src/content/pages/home.mdx`
- `/about` ← `src/content/pages/about.mdx` (menú: "Sobre mí")
- `/writings` (índice) y `/writings/<id>` ← `src/content/writings/*`
- `/rss.xml` ← `src/pages/rss.xml.js` (feed de `writings`; enlaces `/writings/<id>/`)
- `/sitemap-index.xml` (generado por `@astrojs/sitemap`)
- `404` ← `src/pages/404.astro`

Las páginas dinámicas usan `getStaticPaths()`; en `pages`, `home` mapea a `params.id`
`undefined` (la raíz).

## Despliegue

Push a `main` → GitHub Actions (`.github/workflows/deploy.yml`, `withastro/action@v6` +
`actions/deploy-pages`) construye y publica en GitHub Pages. `public/CNAME` fija el dominio
`marcoveron.me`. El `site` de Astro se toma de **`sideyConfig.site.url`** en `sidey.config.ts`
(`astro.config.mjs` lo lee de ahí); debe seguir siendo `https://marcoveron.me` porque afecta
a canonical, sitemap y RSS. Astro 6 requiere Node ≥ 22.12 (el workflow usa Node 24).

## Convenciones

- Todo el contenido e interfaz en **español**, con acentos correctos.
- Crea entradas nuevas con `npm run new` (o copiando el frontmatter de otra). El nombre del
  archivo (en minúsculas, sin espacios ni acentos) es la URL.
- Al añadir campos al frontmatter, actualiza el esquema en `src/content.config.ts` y la
  tabla de `CONTENIDO.md` (la guía de publicación del usuario).
- Al cambiar identidad, menú o enlaces sociales, edita **solo** `sidey.config.ts` (y, si
  añades un campo nuevo al config, su esquema en `src/utils/parseConfig.ts`).
- Mantén el diseño minimalista: reutiliza las utilidades de Tailwind y los tokens de color
  (`text-foreground`, `text-muted-foreground`, `border-border`, etc.) de `global.css` antes
  de añadir estilos nuevos. La apariencia se ajusta en `src/styles/global.css`, los layouts
  de `src/layouts/pages/` y `ec.config.mjs` (bloques de código).
