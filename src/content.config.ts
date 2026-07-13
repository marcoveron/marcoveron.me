import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

/**
 * Esquema compartido por el blog y las reflexiones.
 * El frontmatter de cada archivo .md se valida contra esto: si olvidas un
 * campo obligatorio (por ejemplo `title` o `date`), el build avisa con un
 * mensaje claro.
 */
const postSchema = z.object({
  /** Título de la entrada (obligatorio). */
  title: z.string(),
  /** Fecha de publicación, formato YYYY-MM-DD (obligatorio). */
  date: z.coerce.date(),
  /** Resumen corto opcional, se muestra en los listados y en SEO. */
  description: z.string().optional(),
  /** Etiquetas opcionales, p. ej. [astro, notas]. */
  tags: z.array(z.string()).default([]),
  /** Ponlo en `true` para ocultar la entrada del sitio publicado. */
  draft: z.boolean().default(false),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: postSchema,
});

const reflexiones = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reflexiones' }),
  schema: postSchema,
});

export const collections = { blog, reflexiones };
