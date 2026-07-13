# marcoveron.me

Sitio web personal y blog de Marco Verón, construido con [Astro](https://astro.build).
Diseño minimalista, con secciones de **Blog**, **Reflexiones** (diario), **Proyectos**,
**Sobre mí** y **Enlaces**. Tema claro/oscuro con selector.

## Uso rápido

```bash
npm install     # instalar dependencias (solo la primera vez)
npm run dev      # servidor local en http://localhost:4321
npm run build    # generar el sitio en dist/
npm run preview  # previsualizar el build de producción
```

## Cómo publicar contenido

Ver **[CONTENIDO.md](CONTENIDO.md)** para la guía completa. En resumen: crea un archivo
`.md` en `src/content/blog/` (o `src/content/reflexiones/`), ponle la cabecera con
`title` y `date`, y aparece solo en el sitio.

## Estructura

```
src/
  content/
    blog/          # posts del blog (un .md por post)
    reflexiones/   # entradas del diario (un .md por entrada)
  content.config.ts  # esquema del frontmatter (validación)
  pages/           # rutas del sitio (.astro)
  layouts/         # plantillas (BaseLayout, PostLayout)
  components/      # piezas reutilizables (PostCard, ThemeToggle)
  styles/          # estilos globales
  site.config.ts   # nombre, enlaces sociales y menú (EDITAR AQUÍ)
  projects.ts      # lista de proyectos
public/            # archivos estáticos (favicon, CNAME, imágenes)
```

Datos que probablemente quieras editar primero: `src/site.config.ts` (nombre, enlaces,
menú), `src/projects.ts` (proyectos) y `src/pages/sobre-mi.astro` (tu bio).

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
