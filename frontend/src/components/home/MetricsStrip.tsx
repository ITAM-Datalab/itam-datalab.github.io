/**
 * Franja de cifras. Tipografía grande, sin tarjetas. Los números cuentan desde 0 al entrar.
 */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import Container from '../layout/Container';
import Reveal from '../common/Reveal';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.hairline};
`;

const Title = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Number = styled.p`
  font-size: clamp(2.6rem, 5vw, 4.4rem);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.teal};
  letter-spacing: -0.04em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  margin: 0 0 0.4rem;
  max-width: none;
`;

const Label = styled.p`
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.95rem;
  margin: 0;
`;

const metrics = [
  { value: 15, suffix: '+', label: 'Proyectos activos' },
  { value: 30, suffix: '+', label: 'Estudiantes' },
  { value: 5, suffix: '', label: 'Áreas de impacto' },
  { value: 100, suffix: '%', label: 'Código abierto' },
];

interface CountUpProps {
  to: number;
  suffix?: string;
  delay?: number;
}

/** Cuenta de 0 a `to` una sola vez, cuando el número entra al viewport. */
const CountUp: React.FC<CountUpProps> = ({ to, suffix = '', delay = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const controls = animate(0, to, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, suffix, delay]);

  // El lector de pantalla recibe siempre el valor final; el conteo visual es decorativo.
  return (
    <>
      <span className="sr-only">{`${to}${suffix}`}</span>
      <span ref={ref} aria-hidden="true">
        {reduce ? `${to}${suffix}` : `0${suffix}`}
      </span>
    </>
  );
};

const MetricsStrip: React.FC = () => (
  <Section>
    <Container>
      <Reveal>
        <Title>El laboratorio en números</Title>
        <Grid>
          {metrics.map((item, index) => (
            <div key={item.label}>
              <Number>
                <CountUp to={item.value} suffix={item.suffix} delay={index * 0.12} />
              </Number>
              <Label>{item.label}</Label>
            </div>
          ))}
        </Grid>
      </Reveal>
    </Container>
  </Section>
);

export default MetricsStrip;
