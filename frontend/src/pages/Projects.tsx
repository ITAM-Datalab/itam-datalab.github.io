/**
 * Listado de proyectos. Misma familia visual que el teaser del Home.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/layout/Container';
import PageFrame from '../components/layout/PageFrame';
import Reveal from '../components/common/Reveal';
import { projects } from '../data/projects';

const Title = styled.h1`
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  margin-bottom: 0.75rem;
`;

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled(Link)`
  display: grid;
  gap: 1.25rem;
  padding: 1.75rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};
  color: inherit;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 220px 1fr;
  }

  &:hover {
    color: inherit;
    text-decoration: none;
  }

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.hairline};
  }
`;

const Thumb = styled.img`
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const Name = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 0.4rem;
`;

const Summary = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0;
`;

const Projects: React.FC = () => (
  <PageFrame>
    <Container>
      <Reveal>
        <Title>Proyectos</Title>
        <Lead>
          Software, mapas y prototipos para problemáticas sociales, económicas y ambientales.
        </Lead>
        <List>
          {projects.map((project) => (
            <Row key={project.id} to={project.href}>
              <Thumb src={project.image} alt="" />
              <div>
                <Name>{project.title}</Name>
                <Summary>{project.summary}</Summary>
              </div>
            </Row>
          ))}
        </List>
      </Reveal>
    </Container>
  </PageFrame>
);

export default Projects;
