/**
 * Proyectos públicos del laboratorio. Fuente única para Home y /proyectos.
 */
export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  image: string;
  href: string;
}

export const projects: ProjectItem[] = [
  {
    id: 'horas-servicio',
    title: 'Horas de servicio',
    summary: 'Plataforma para registrar y dar seguimiento a las horas de servicio del laboratorio.',
    image: `${process.env.PUBLIC_URL ?? ''}/images/proyecto-horas.png`,
    href: '/proyectos/horas-servicio',
  },
  {
    id: 'clasificacion-residuos',
    title: 'Clasificación de residuos',
    summary: 'Modelo y prototipo para separar residuos con visión por computadora.',
    image: `${process.env.PUBLIC_URL ?? ''}/images/proyecto-residuos.png`,
    href: '/proyectos/clasificacion-residuos',
  },
  {
    id: 'vision-urbana',
    title: 'Visión urbana',
    summary: 'Exploración de visión artificial aplicada a problemas de ciudad.',
    image: `${process.env.PUBLIC_URL ?? ''}/images/proyecto-vision.png`,
    href: '/proyectos/vision-urbana',
  },
];
