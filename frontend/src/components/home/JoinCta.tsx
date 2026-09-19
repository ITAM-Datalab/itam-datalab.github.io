/**
 * Bloque teal unico de cierre. Un CTA: Postularme.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Reveal from '../common/Reveal';
import Button from '../ui/Button';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.teal};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  max-width: 14ch;
  margin: 0 auto 1rem;
`;

const Lead = styled.p`
  color: rgba(247, 246, 242, 0.82);
  margin: 0 auto 1.75rem;
`;

const JoinCta: React.FC = () => (
  <Section>
    <Reveal>
      <Title>Suma tu perfil al laboratorio</Title>
      <Lead>
        Buscamos estudiantes del ITAM que quieran construir con datos y evidencia.
      </Lead>
      <Link to="/contacto">
        <Button size="lg">Postularme</Button>
      </Link>
    </Reveal>
  </Section>
);

export default JoinCta;
