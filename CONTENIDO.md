# Cómo publicar contenido

Esta es la guía para el día a día: cómo añadir entradas al blog. No hace falta saber
programar, solo crear archivos de texto en Markdown.

## Añadir una entrada (lo más rápido)

Desde la terminal, en la carpeta del proyecto:

```bash
npm run new
```

Te preguntará el **título**, la **descripción** y las **etiquetas**, y creará el archivo
listo en `src/content/writings/`. Luego solo tienes que abrirlo y escribir tu texto debajo
de la cabecera.

## Añadir una entrada a mano

1. Crea un archivo nuevo en **`src/content/writings/`**. El nombre del archivo será parte de
   la dirección web: `mi-primer-viaje.mdx` → `marcoveron.me/writings/mi-primer-viaje`.
   Usa solo minúsculas, números y guiones (sin espacios ni acentos en el nombre). Puede ser
   `.md` o `.mdx`.
2. Pega esta cabecera al principio y ajústala:

   ```markdown
   ---
   title: "El título de mi entrada"
   description: "Un resumen de una frase (opcional pero recomendable)."
   date: 2026-07-15
   tags: ["viajes", "notas"]
   draft: false
   ---

   Aquí empieza el texto de la entrada, en Markdown.
   ```

3. Escribe debajo del segundo `---`. Al guardar, aparece automáticamente en
   [/writings](http://localhost:4321/writings), ordenado por fecha (lo más reciente primero).

## Los campos de la cabecera (frontmatter)

| Campo         | ¿Obligatorio? | Qué es                                                        |
| ------------- | ------------- | ------------------------------------------------------------- |
| `title`       | Sí            | Título de la entrada.                                         |
| `description` | No            | Resumen corto; se muestra en el listado y ayuda al SEO.       |
| `date`        | Sí            | Fecha en formato `AAAA-MM-DD` (p. ej. `2026-07-15`).          |
| `tags`        | No            | Lista de etiquetas, p. ej. `["astro", "notas"]`.             |
| `draft`       | No            | `true` = borrador (no se publica). Por defecto `false`.       |

Si olvidas un campo obligatorio o escribes mal la fecha, `npm run dev` o `npm run build` te
avisará con un mensaje claro señalando el archivo.

## Formato Markdown básico

```markdown
## Un subtítulo

Un párrafo normal con **negrita**, _cursiva_ y un [enlace](https://ejemplo.com).

- Elemento de lista
- Otro elemento

> Una cita.

`código en línea` y bloques:

​```js
const saludo = "hola"
​```
```

## Imágenes

Coloca la imagen en `public/` (por ejemplo `public/imagenes/foto.jpg`) y en el Markdown
escribe: `![Texto alternativo](/imagenes/foto.jpg)`. Al hacer clic, la imagen se abre a
pantalla completa (lightbox), sin configurar nada.

## Guardar un borrador

Pon `draft: true` en la cabecera. Una entrada con `draft: true` **no aparece** en el listado
ni en el feed RSS (tampoco al ejecutar `npm run dev`). Cuando esté lista, cámbialo a
`draft: false` (o borra la línea) y haz push.

## Editar las páginas fijas

- La **portada** está en `src/content/pages/home.mdx`.
- La página **"Sobre mí"** está en `src/content/pages/about.mdx`.

Se editan igual que una entrada, pero su cabecera solo lleva `title` y `description`
(sin fecha ni etiquetas).

## Publicar los cambios

```bash
git add -A
git commit -m "Nueva entrada: el título"
git push
```

GitHub Actions reconstruye y publica el sitio solo en un par de minutos.
