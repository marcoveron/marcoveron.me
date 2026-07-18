# marcoveron.me

Sitio web personal y blog de Marco Verón, construido con [Astro](https://astro.build) sobre
la plantilla [Astro Sidey](https://github.com/odhyp/astro-sidey). Diseño minimalista y
tipográfico, tema único claro (paleta [Flexoki](https://stephango.com/flexoki)), con una
sección de **Escritos** y una página **Sobre mí**.

## Uso rápido

```bash
npm install      # instalar dependencias (solo la primera vez)
npm run dev      # servidor local en http://localhost:4321
npm run new      # crear una entrada nueva (pregunta título, descripción, tags)
npm run build    # generar el sitio en dist/
npm run preview  # previsualizar el build de producción
```

## Cómo publicar contenido

Ver **[CONTENIDO.md](CONTENIDO.md)** para la guía completa. En resumen: ejecuta
`npm run new` (o crea un archivo `.md`/`.mdx` en `src/content/writings/` con la cabecera de
`title` y `date`) y la entrada aparece sola en el sitio.

## Estructura

```
sidey.config.ts    # nombre, descripción, menú y enlaces sociales (EDITAR AQUÍ)
ec.config.mjs      # ajustes de Expressive Code (bloques de código)
src/
  content/
    pages/         # páginas fijas: home.mdx (/), about.mdx (/about)
    writings/      # entradas del blog (un .md/.mdx por entrada → /writings/...)
  content.config.ts  # esquema del frontmatter (validación con Zod)
  pages/           # rutas de Astro ([...id], writings/, rss.xml, 404)
  layouts/         # BaseLayout + layouts de página (SinglePage, WritingPage)
  components/      # piezas reutilizables (Sidebar, Footer, WritingCard, ...)
  plugins/         # remark/rehype (tiempo de lectura, lightbox)
  styles/          # global.css (paleta Flexoki + tokens)
  utils/           # getContent, formatDate, parseConfig
public/            # archivos estáticos (favicon, CNAME, imágenes)
```

Datos que probablemente quieras editar primero: `sidey.config.ts` (nombre, menú, enlaces),
`src/content/pages/about.mdx` (tu bio) y `src/content/pages/home.mdx` (la portada).

> **Nota sobre la plantilla:** el `global.css` incluye variables para un modo oscuro, pero el
> sitio no monta ningún selector de tema; funciona en un único tema claro por diseño.

---

## Despliegue en GitHub Pages con dominio de Namecheap

El sitio se despliega **solo** en cada `git push` a `main` mediante GitHub Actions
(ver [.github/workflows/deploy.yml](.github/workflows/deploy.yml)). Pasos para dejarlo en
marcha (se hacen una sola vez):

### 1. Subir el proyecto a GitHub

```bash
git init
git add -A
git commit -m "Sitio inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/marcoveron.me.git
git push -u origin main
```

### 2. Activar GitHub Pages

En el repo → **Settings → Pages → Build and deployment → Source** = **GitHub Actions**.
Con eso, el workflow ya publica en cada push.

### 3. Configurar el dominio personalizado en GitHub

En **Settings → Pages → Custom domain**, escribe `marcoveron.me` y guarda.
(El archivo `public/CNAME` ya contiene el dominio, así que se conserva en cada build.)

### 4. Apuntar el DNS en Namecheap

En Namecheap → tu dominio → **Advanced DNS**, añade estos registros:

| Tipo  | Host  | Valor                       |
| ----- | ----- | --------------------------- |
| A     | `@`   | `185.199.108.153`           |
| A     | `@`   | `185.199.109.153`           |
| A     | `@`   | `185.199.110.153`           |
| A     | `@`   | `185.199.111.153`           |
| CNAME | `www` | `TU-USUARIO.github.io.`     |

Borra los registros por defecto de Namecheap (el "URL Redirect" y el CNAME de
parking) para que no interfieran. La propagación puede tardar de minutos a 24 h.

### 5. Activar HTTPS

Cuando GitHub verifique el dominio (en Settings → Pages), marca **Enforce HTTPS**.

> **Nota:** si tu repositorio se llama distinto de `TU-USUARIO.github.io`, no hace falta
> configurar `base` en `astro.config.mjs` porque usas un dominio raíz propio.
