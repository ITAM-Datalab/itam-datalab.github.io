/**
 * Tres recortes fotográficos de trabajo reciente. El del centro es más ancho.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../layout/Container';
import Reveal from '../common/Reveal';
import { projects } from '../../data/projects';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3.2rem);
`;

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0.4rem 0 0;
`;

const AllLink = styled(Link)`
  color: ${({ theme }) => theme.colors.teal};
  font-weight: 500;
`;

const Grid = styled.div`
  display: grid;
  gap: 0.6rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1.45fr 1fr;
    align-items: stretch;
  }
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  color: inherit;
  min-width: 0;

  &:hover {
    color: inherit;
    text-decoration: none;
  }

  img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    transition: transform 480ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img {
    transform: scale(1.02);
  }

  /* Misma altura en las tres fotos: cambian los anchos, no el borde inferior. */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    img {
      aspect-ratio: auto;
      height: clamp(320px, 34vw, 460px);
    }
  }
`;

const Caption = styled.p`
  margin: 0.75rem 0 0;
  font-weight: 500;
`;

const ProjectsTeaser: React.FC = () => (
  <Section>
    <Container>
      <Reveal>
        <Head>
          <div>
            <Title>Trabajo reciente</Title>
            <Lead>Software, mapas y prototipos hechos por estudiantes del ITAM.</Lead>
          </div>
          <AllLink to="/proyectos">Ver todos</AllLink>
        </Head>
        <Grid>
          {projects.map((project) => (
            <Card key={project.id} to={project.href}>
              <img src={project.image} alt="" />
              <Caption>{project.title}</Caption>
            </Card>
          ))}
        </Grid>
      </Reveal>
    </Container>
  </Section>
);

export default ProjectsTeaser;
