import { getCollection, type CollectionEntry } from 'astro:content';

export type PostCollection = 'blog' | 'reflexiones';
export type Post = CollectionEntry<'blog'> | CollectionEntry<'reflexiones'>;

/**
 * Devuelve las entradas de una colección ya ordenadas por fecha (más recientes
 * primero) y sin borradores. En desarrollo (`astro dev`) sí muestra los
 * borradores para que puedas previsualizarlos.
 */
export async function getSortedPosts(collection: PostCollection): Promise<Post[]> {
  const posts = await getCollection(collection, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  return posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

/** Formatea una fecha en español, p. ej. "13 de julio de 2026". */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Formato corto para atributos `datetime`, p. ej. "2026-07-13". */
export function isoDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
