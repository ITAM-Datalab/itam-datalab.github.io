/**
 * Sobre nosotros: título y prosa en una columna, foto contenida que acompaña al leer.
 */
import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Container from '../components/layout/Container';
import PageFrame from '../components/layout/PageFrame';
import Reveal from '../components/common/Reveal';

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1.1fr 0.9fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'intro photo'
      'body  photo';
    column-gap: ${({ theme }) => theme.spacing['3xl']};
    row-gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const Intro = styled(Reveal)`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-area: intro;
  }
`;

const Body = styled(Reveal)`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-area: body;
  }
`;

const PhotoWrap = styled(Reveal)`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-area: photo;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  margin-bottom: 1rem;
`;

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 1.15rem;
  margin: 0;
`;

const Photo = styled.img`
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: sticky;
    top: 7rem;
    aspect-ratio: 5 / 4;
    max-height: calc(100dvh - 10rem);
  }
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Paragraph = styled(motion.p)<{ $lead?: boolean }>`
  font-size: 1.05rem;
  line-height: 1.75;
  color: ${({ theme, $lead }) => ($lead ? theme.colors.teal : theme.colors.ink)};
  font-weight: ${({ $lead }) => ($lead ? 500 : 400)};
  margin: 0;
`;

const paragraphs = [
  'En el Datalab somos una comunidad multidisciplinaria de estudiantes del ITAM que transforma la ciencia de datos en acción social. Aquí, la curiosidad se convierte en proyectos que impactan de verdad y la teoría se vuelve herramienta para crear soluciones tecnológicas con compromiso hacia México.',
  'Creemos que los datos pueden cambiar realidades. Por eso trabajamos para democratizar su uso y poner la ciencia al servicio de la sociedad. Nuestra misión es fomentar una cultura basada en la evidencia, la colaboración y el bien común.',
  'Aprendemos haciendo. En cada proyecto colaborativo aplicamos herramientas modernas de ciencia de datos para resolver problemas reales y medibles. Cada integrante desarrolla habilidades que van más allá del código: comunicación, ética y empatía.',
  'El Datalab es una red de estudiantes que comparten pasión por los datos y el cambio social. Nos impulsa una cultura de mentoría: quienes ya recorrieron el camino acompañan a los que inician.',
];

/**
 * Párrafo que pasa de tenue a tinta completa mientras cruza la parte baja de la pantalla,
 * como si se iluminara al llegar a él. Con reduced-motion se muestra completo desde el inicio.
 */
const ReadingParagraph: React.FC<{ text: string; lead?: boolean }> = ({ text, lead }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.62'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.22, 1]);

  return (
    <Paragraph ref={ref} $lead={lead} style={reduce ? undefined : { opacity }}>
      {text}
    </Paragraph>
  );
};

const About: React.FC = () => (
  <PageFrame>
    <Container>
      <Grid>
        <Intro>
          <Title>Sobre nosotros</Title>
          <Lead>
            Un laboratorio de estudiantes que convierte evidencia en trabajo público.
          </Lead>
        </Intro>
        <PhotoWrap delay={0.08}>
          <Photo
            src={`${process.env.PUBLIC_URL ?? ''}/images/comunidad.png`}
            alt="Estudiantes del DataLab trabajando en equipo"
          />
        </PhotoWrap>
        <Body delay={0.1}>
          <Article>
            {paragraphs.map((text, index) => (
              <ReadingParagraph key={text.slice(0, 24)} text={text} lead={index === 0} />
            ))}
          </Article>
        </Body>
      </Grid>
    </Container>
  </PageFrame>
);

export default About;
