/**
 * Hero a pantalla completa: foto de ciudad, texto abajo-izquierda.
 */
import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';

const Section = styled.section`
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.white};
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(15, 24, 28, 0.28) 0%,
      rgba(15, 24, 28, 0.55) 55%,
      rgba(15, 24, 28, 0.72) 100%
    );
  }
`;

/* Más alta que el hero: el desplazamiento del parallax nunca deja ver el borde. */
const Parallax = styled(motion.div)`
  position: absolute;
  inset: -12% 0;
  will-change: transform;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md} 4.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing.xl} 5.5rem;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-size: clamp(2.4rem, 6vw, 5rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1.05;
  max-width: 14ch;
  margin-bottom: 1.1rem;
`;

const Lead = styled.p`
  color: rgba(247, 246, 242, 0.82);
  font-size: 1.05rem;
  max-width: 38ch;
  margin-bottom: 1.6rem;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const HeroSection: React.FC = () => {
  const reduce = useReducedMotion();
  const heroSrc = `${process.env.PUBLIC_URL ?? ''}/images/hero.png`;
  const sectionRef = useRef<HTMLElement>(null);

  // 0 = hero completo en pantalla, 1 = hero ya salió por arriba.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '9%']);
  const textY = useTransform(scrollYProgress, [0, 0.7], [0, -70]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <Section ref={sectionRef}>
      <Backdrop>
        <Parallax style={reduce ? undefined : { y: photoY }}>
          <img
            src={heroSrc}
            alt="Atardecer sobre la Ciudad de México"
          />
        </Parallax>
      </Backdrop>
      <Content>
        <motion.div style={reduce ? undefined : { y: textY, opacity: textOpacity }}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Title>Datos para el cambio social</Title>
            <Lead>
              Estudiantes del ITAM que convierten evidencia en proyectos públicos para México.
            </Lead>
            <Actions>
              <Link to="/proyectos">
                <Button size="lg">Ver proyectos</Button>
              </Link>
              <Link to="/sobre-nosotros">
                <Button variant="outline" size="lg">
                  Conoce el equipo
                </Button>
              </Link>
            </Actions>
          </motion.div>
        </motion.div>
      </Content>
    </Section>
  );
};

export default HeroSection;
