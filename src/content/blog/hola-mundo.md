---
title: 'Hola, mundo'
date: 2026-07-13
description: 'La primera publicación de este blog: qué es y cómo está hecho.'
tags: ['notas', 'astro']
---

Este es el primer post del blog. Si estás leyendo esto, el sitio ya funciona. 🎉

## Qué encontrarás aquí

En el **blog** publicaré notas más elaboradas: cosas que aprendo, ideas que
quiero desarrollar y apuntes técnicos. Para pensamientos más breves y sueltos,
tipo diario, está la sección de [reflexiones](/reflexiones).

## Cómo escribir un post nuevo

Publicar es tan simple como crear un archivo `.md`:

1. Crea un archivo en `src/content/blog/`, por ejemplo `mi-idea.md`.
2. Copia la cabecera (el "frontmatter") de este post y cambia los valores.
3. Escribe en Markdown debajo de la línea `---`.

El post aparece automáticamente en el listado, ordenado por fecha. Puedes usar
todo lo habitual de Markdown:

- Listas como esta.
- **Negrita** y _cursiva_.
- [Enlaces](https://astro.build).
- Y bloques de código:

```js
console.log('¡Hola desde el blog!');
```

> Un consejo: pon `draft: true` en el frontmatter para guardar un borrador sin
> que se publique.

¡Nos leemos!
