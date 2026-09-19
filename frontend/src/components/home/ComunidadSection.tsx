/**
 * Foto a la izquierda, texto a la derecha. Enlace unico a Sobre nosotros.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../layout/Container';
import Reveal from '../common/Reveal';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
`;

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing['2xl']};
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1.35fr 0.65fr;
  }
`;

const Photo = styled.img`
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  max-width: 12ch;
  margin-bottom: 1rem;
`;

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  margin-bottom: 1.25rem;
`;

const More = styled(Link)`
  color: ${({ theme }) => theme.colors.teal};
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 4px;
`;

const ComunidadSection: React.FC = () => (
  <Section>
    <Container>
      <Reveal>
        <Layout>
          <Photo
            src={`${process.env.PUBLIC_URL ?? ''}/images/comunidad.png`}
            alt="Estudiantes trabajando juntos en un taller"
          />
          <div>
            <Title>Una red que aprende haciendo</Title>
            <Lead>
              Comunidad multidisciplinaria del ITAM. La teoría se vuelve herramienta
              y cada proyecto busca impacto público.
            </Lead>
            <More to="/sobre-nosotros">Sobre nosotros</More>
          </div>
        </Layout>
      </Reveal>
    </Container>
  </Section>
);

export default ComunidadSection;
