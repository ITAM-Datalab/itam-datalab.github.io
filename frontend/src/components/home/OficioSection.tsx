/**
 * Oficio del lab: tres filas editoriales + recorte de mapa.
 */
import React from 'react';
import styled from 'styled-components';
import Container from '../layout/Container';
import Reveal from '../common/Reveal';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
`;

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: center;
  }
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3.4rem);
  max-width: 14ch;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Rows = styled.dl`
  display: grid;
  gap: 0;
`;

const Row = styled.div`
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 180px 1fr;
    gap: 1.5rem;
  }

  &:first-child {
    border-top-color: ${({ theme }) => theme.colors.teal};
    border-top-width: 2px;
  }
`;

const Term = styled.dt`
  font-weight: 500;
`;

const Detail = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const Photo = styled.img`
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    aspect-ratio: 1 / 1;
  }
`;

const rows = [
  {
    term: 'Software',
    detail: 'Plataformas que organizan horas, talento y operación del laboratorio.',
  },
  {
    term: 'Visualización',
    detail: 'Mapas y tableros que hacen visible un problema público.',
  },
  {
    term: 'Investigación',
    detail: 'Análisis con evidencia para políticas y comunidades.',
  },
];

const OficioSection: React.FC = () => (
  <Section>
    <Container>
      <Layout>
        <Reveal>
          <Title>Construimos herramientas que la ciudad puede usar</Title>
          <Rows>
            {rows.map((row) => (
              <Row key={row.term}>
                <Term>{row.term}</Term>
                <Detail>{row.detail}</Detail>
              </Row>
            ))}
          </Rows>
        </Reveal>
        <Reveal delay={0.08}>
          <Photo
            src={`${process.env.PUBLIC_URL ?? ''}/images/oficio-mapa.png`}
            alt="Mapa impreso de la ciudad con un lápiz"
          />
        </Reveal>
      </Layout>
    </Container>
  </Section>
);

export default OficioSection;
