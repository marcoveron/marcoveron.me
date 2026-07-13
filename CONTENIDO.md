# Cómo publicar contenido

Esta es la guía para el día a día: cómo añadir posts y reflexiones. No hace falta saber
programar, solo crear archivos de texto en Markdown.

## Añadir una publicación al blog

1. Crea un archivo nuevo en **`src/content/blog/`**. El nombre del archivo será parte de la
   dirección web: `mi-primer-viaje.md` → `marcoveron.me/blog/mi-primer-viaje`.
   Usa solo minúsculas, números y guiones (sin espacios ni acentos en el nombre).
2. Pega esta cabecera al principio y ajústala:

   ```markdown
   ---
   title: 'El título de mi publicación'
   date: 2026-07-13
   description: 'Un resumen de una frase (opcional pero recomendable).'
   tags: ['viajes', 'notas']
   draft: false
   ---

   Aquí empieza el texto de la publicación, en Markdown.
   ```

3. Escribe debajo del segundo `---`. Al guardar, aparece automáticamente en
   [/blog](http://localhost:4321/blog), ordenado por fecha (lo más reciente primero).

## Añadir una reflexión (diario)

Igual que un post, pero el archivo va en **`src/content/reflexiones/`**. Suelen ser más
cortas. Aparecen en [/reflexiones](http://localhost:4321/reflexiones).

## Los campos de la cabecera (frontmatter)

| Campo         | ¿Obligatorio? | Qué es                                                        |
| ------------- | ------------- | ------------------------------------------------------------- |
| `title`       | Sí            | Título de la entrada.                                         |
| `date`        | Sí            | Fecha en formato `AAAA-MM-DD` (p. ej. `2026-07-13`).          |
| `description` | No            | Resumen corto; se muestra en los listados y ayuda al SEO.     |
| `tags`        | No            | Lista de etiquetas, p. ej. `['astro', 'notas']`.              |
| `draft`       | No            | `true` = borrador (no se publica). Por defecto `false`.       |

Si olvidas un campo obligatorio o escribes mal la fecha, `npm run dev` o `npm run build`
te avisará con un mensaje claro señalando el archivo.

## Formato Markdown básico

```markdown
## Un subtítulo

Un párrafo normal con **negrita**, _cursiva_ y un [enlace](https://ejemplo.com).

- Elemento de lista
- Otro elemento

> Una cita.

`código en línea` y bloques:

​```js
const saludo = 'hola';
​```
```

## Imágenes

Coloca la imagen en `public/` (por ejemplo `public/imagenes/foto.jpg`) y en el Markdown
escribe: `![Texto alternativo](/imagenes/foto.jpg)`.

## Guardar un borrador

Pon `draft: true` en la cabecera. El borrador **sí** se ve en local (`npm run dev`) para
que lo revises, pero **no** se publica en el sitio real. Cuando esté listo, cámbialo a
`draft: false` (o borra la línea) y haz push.

## Publicar los cambios

```bash
git add -A
git commit -m "Nuevo post: el título"
git push
```

GitHub Actions reconstruye y publica el sitio solo en un par de minutos.
