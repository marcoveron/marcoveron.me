/**
 * Lista de proyectos que se muestran en /proyectos.
 * Para añadir uno nuevo, copia un bloque y edítalo. Los `links` son opcionales.
 */
export interface Project {
  name: string;
  description: string;
  /** Año o rango, p. ej. "2026" o "2024–2025". Opcional. */
  period?: string;
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    name: 'Nombre del proyecto',
    description:
      'Una frase o dos describiendo qué es el proyecto y por qué es interesante. Reemplaza este texto por uno de tus proyectos reales.',
    period: '2026',
    links: [
      { label: 'Código', href: 'https://github.com/tu-usuario/proyecto' },
      { label: 'Demo', href: 'https://ejemplo.com' },
    ],
  },
  {
    name: 'Otro proyecto',
    description:
      'Descripción breve del segundo proyecto. Puedes borrar los que no necesites o dejar solo uno.',
    period: '2025',
    links: [{ label: 'Código', href: 'https://github.com/tu-usuario/otro' }],
  },
];
