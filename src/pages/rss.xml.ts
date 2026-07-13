import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../site.config';
import { getSortedPosts } from '../utils';

// Feed RSS del blog. Disponible en /rss.xml
export async function GET(context: APIContext) {
  const posts = await getSortedPosts('blog');

  return rss({
    title: `${site.title} — Blog`,
    description: site.description,
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
  });
}
