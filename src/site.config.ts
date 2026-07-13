/**
 * Configuración central del sitio.
 * Edita este archivo para cambiar el nombre, la descripción y tus enlaces:
 * todo se usa desde aquí en el resto del sitio.
 */
export const site = {
  /** Nombre que se muestra en el header y en los metadatos. */
  title: 'Marco Verón',
  /** Descripción por defecto para SEO y para la portada. */
  description: 'Blog personal de Marco Verón: publicaciones, reflexiones y proyectos.',
  /** URL de producción (debe coincidir con `site` en astro.config.mjs). */
  url: 'https://marcoveron.me',
  /** Idioma del sitio. */
  lang: 'es',
  /** Frase corta que aparece bajo tu nombre en la portada. */
  tagline: 'Notas, ideas y proyectos.',
  /** Tu correo (se usa en la página de Enlaces y en el footer). */
  email: 'mv.marcoveron@gmail.com',
} as const;

/**
 * Enlaces sociales / de contacto.
 * Comenta o borra los que no uses; el `label` es lo que se muestra.
 */
export const socialLinks: { label: string; href: string }[] = [
  { label: 'GitHub', href: 'https://github.com/marcoveron' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/marcoveron' },
  { label: 'Email', href: `mailto:${site.email}` },
];

/**
 * Navegación principal (header). El orden aquí es el orden en el menú.
 */
export const navLinks: { label: string; href: string }[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Reflexiones', href: '/reflexiones' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Sobre mí', href: '/sobre-mi' },
  { label: 'Enlaces', href: '/enlaces' },
];
