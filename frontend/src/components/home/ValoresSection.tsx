/**
 * Cómo decidimos el trabajo. En escritorio la sección se fija en pantalla: la foto cambia de
 * encuadre y se resalta un principio a la vez conforme se hace scroll. En móvil, o con
 * reduced-motion, es una foto con tres principios apilados.
 */
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import Container from '../layout/Container';
import Reveal from '../common/Reveal';
import theme from '../../styles/theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const HEADER_HEIGHT = 72;

const Section = styled.section<{ $pinned: boolean }>`
  padding: ${({ theme: t }) => t.spacing['3xl']} 0;

  ${({ $pinned }) =>
    $pinned &&
    css`
      padding: 0;
      /* Tramo de scroll: ~60dvh por principio mientras la escena está fija. */
      height: 280dvh;
    `}
`;

const Stage = styled.div<{ $pinned: boolean }>`
  ${({ $pinned }) =>
    $pinned &&
    css`
      position: sticky;
      top: ${HEADER_HEIGHT}px;
      height: calc(100dvh - ${HEADER_HEIGHT}px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1.5rem 0;
    `}
`;

const Inner = styled.div<{ $pinned: boolean }>`
  ${({ $pinned }) =>
    $pinned &&
    css`
      display: flex;
      flex-direction: column;
      min-height: 0;
      max-height: 100%;
    `}
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: ${({ theme: t }) => t.spacing.xl};
`;

const Layout = styled.div<{ $pinned: boolean }>`
  display: grid;
  gap: ${({ theme: t }) => t.spacing.xl};

  @media (min-width: ${({ theme: t }) => t.breakpoints.lg}) {
    grid-template-columns: 1.2fr 0.8fr;
    gap: ${({ theme: t }) => t.spacing['2xl']};
    align-items: stretch;
  }

  ${({ $pinned }) =>
    $pinned &&
    css`
      min-height: 0;
      height: min(560px, calc(100dvh - ${HEADER_HEIGHT + 190}px));
    `}
`;

const PhotoFrame = styled.div<{ $pinned: boolean }>`
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  border-radius: ${({ theme: t }) => t.borderRadius.lg};
  background: ${({ theme: t }) => t.colors.backgroundAlt};

  ${({ $pinned }) =>
    $pinned &&
    css`
      aspect-ratio: auto;
      height: 100%;
      min-height: 0;
    `}
`;

const Photo = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
`;

const Badge = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.85rem;
  border-radius: ${({ theme: t }) => t.borderRadius.full};
  background: rgba(15, 24, 28, 0.62);
  backdrop-filter: blur(8px);
  color: ${({ theme: t }) => t.colors.white};
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
`;

const List = styled.div<{ $pinned: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;

  ${({ $pinned }) =>
    $pinned &&
    css`
      justify-content: center;
      padding-left: 1.75rem;
    `}
`;

const RailTrack = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: ${({ theme: t }) => t.colors.hairline};
`;

const RailFill = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: ${({ theme: t }) => t.colors.teal};
  transform-origin: top;
`;

const Item = styled.div<{ $pinned: boolean; $active: boolean }>`
  padding: 1.25rem 0;
  border-top: 1px solid ${({ theme: t }) => t.colors.hairline};
  transition: opacity 420ms cubic-bezier(0.16, 1, 0.3, 1);

  &:first-child {
    border-top: 2px solid ${({ theme: t }) => t.colors.teal};
  }

  ${({ $pinned, $active }) =>
    $pinned &&
    css`
      border-top: none;
      padding: 1.1rem 0;
      opacity: ${$active ? 1 : 0.4};

      &:first-child {
        border-top: none;
      }
    `}

  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
  }

  p {
    color: ${({ theme: t }) => t.colors.inkMuted};
    margin: 0;
  }
`;

const Num = styled.span`
  display: block;
  margin-bottom: 0.35rem;
  color: ${({ theme: t }) => t.colors.teal};
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
`;

const values = [
  {
    title: 'Impacto social',
    text: 'Buscamos un beneficio directo y medible para las comunidades con las que trabajamos.',
  },
  {
    title: 'Colaboración',
    text: 'Trabajamos en equipo y con socios locales para que las soluciones sirvan de verdad.',
  },
  {
    title: 'Transparencia',
    text: 'Publicamos métodos, datos y hallazgos de forma clara y accesible.',
  },
];

/**
 * Encuadres de la misma foto (16:9). Escala 1.6 permite desplazar hasta ±30% sin ver bordes.
 * 0: quien señala México · 1: el grupo completo · 2: el mapa abierto y las laptops.
 */
const frames = [
  { scale: 1.6, x: '19%', y: '-16%' },
  { scale: 1, x: '0%', y: '0%' },
  { scale: 1.6, x: '-16%', y: '-30%' },
];

const ValoresSection: React.FC = () => {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery(
    `(min-width: ${theme.breakpoints.lg}) and (min-height: 620px)`
  );
  const pinned = isDesktop && !reduce;

  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start ${HEADER_HEIGHT}px`, 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const next = Math.min(values.length - 1, Math.max(0, Math.floor(progress * values.length)));
    setActive((current) => (current === next ? current : next));
  });

  const frame = pinned ? frames[active] : frames[1];

  return (
    <Section ref={sectionRef} $pinned={pinned}>
      <Stage $pinned={pinned}>
        <Container>
          <Inner $pinned={pinned}>
            <Reveal>
              <Title>Cómo decidimos el trabajo</Title>
            </Reveal>
            <Layout $pinned={pinned}>
              <PhotoFrame $pinned={pinned}>
                <Photo
                  src={`${process.env.PUBLIC_URL ?? ''}/images/valores-equipo.png`}
                  alt="Equipo revisando un mapa de México sobre la mesa"
                  animate={{ scale: frame.scale, x: frame.x, y: frame.y }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  initial={false}
                />
                {pinned && (
                  <Badge aria-hidden="true">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={active}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22 }}
                      >
                        {String(active + 1).padStart(2, '0')} / {String(values.length).padStart(2, '0')}
                        {' · '}
                        {values[active].title}
                      </motion.span>
                    </AnimatePresence>
                  </Badge>
                )}
              </PhotoFrame>

              <List $pinned={pinned}>
                {pinned && (
                  <>
                    <RailTrack aria-hidden="true" />
                    <RailFill aria-hidden="true" style={{ scaleY: scrollYProgress }} />
                  </>
                )}
                {values.map((value, index) => (
                  <Item
                    key={value.title}
                    $pinned={pinned}
                    $active={index === active}
                    aria-current={pinned && index === active ? 'true' : undefined}
                  >
                    <Num aria-hidden="true">{String(index + 1).padStart(2, '0')}</Num>
                    <h3>{value.title}</h3>
                    <p>{value.text}</p>
                  </Item>
                ))}
              </List>
            </Layout>
          </Inner>
        </Container>
      </Stage>
    </Section>
  );
};

export default ValoresSection;
