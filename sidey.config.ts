// sidey.config.ts

export const sideyConfig = {
  /**
   * Identidad del sitio y SEO global
   * -------------------------------------------------------------------------
   * Estos valores alimentan las meta etiquetas HTML, el feed RSS y los
   * componentes de cabecera en toda la plantilla.
   */
  site: {
    // Título principal (pestañas del navegador y resultados de búsqueda)
    title: "Marco Verón",

    // Resumen corto usado para SEO y tarjetas al compartir en redes
    description:
      "Blog personal de Marco Verón: publicaciones y notas sobre lo que aprendo, pienso y construyo.",

    // Dominio de producción (sin barra final)
    url: "https://marcoveron.me",

    // Tu nombre; se usa en el copyright y en la meta etiqueta de autor
    author: "Marco Verón",

    // Idioma principal para accesibilidad (p. ej. "es", "en")
    locale: "es",
  },

  /**
   * Navegación de la barra lateral
   * -------------------------------------------------------------------------
   * Controla los enlaces del panel de navegación. Añade, reordena o quita
   * objetos aquí para cambiar la estructura del sitio.
   */
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Escritos", href: "/writings" },
    { label: "Sobre mí", href: "/about" },
    { label: "RSS", href: "/rss.xml" },
  ],

  /**
   * Enlaces sociales / de contacto
   * -------------------------------------------------------------------------
   * Se muestran en el pie de página y en la página "Sobre mí".
   * Borra o comenta los que no uses; el `label` es lo que se muestra.
   */
  socialLinks: [
    { label: "GitHub", href: "https://github.com/marcoveron" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/marcoveron" },
    { label: "Email", href: "mailto:mv.marcoveron@gmail.com" },
  ],
}

export type SideyConfigType = typeof sideyConfig
