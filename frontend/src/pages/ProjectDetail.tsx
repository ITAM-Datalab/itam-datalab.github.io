/**
 * Ficha de un proyecto a partir del catálogo estático.
 */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/layout/Container';
import PageFrame from '../components/layout/PageFrame';
import Reveal from '../components/common/Reveal';
import { projects } from '../data/projects';

const Back = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.teal};
`;

const Title = styled.h1`
  font-size: clamp(2.2rem, 4vw, 3.6rem);
  margin-bottom: 1rem;
`;

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 1.15rem;
  margin-bottom: 2rem;
`;

const Photo = styled.img`
  width: 100%;
  max-width: 820px;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return (
      <PageFrame>
        <Container>
          <Back to="/proyectos">Volver a proyectos</Back>
          <Title>Proyecto no encontrado</Title>
          <Lead>Ese proyecto no está en el catálogo actual.</Lead>
        </Container>
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <Container>
        <Reveal>
          <Back to="/proyectos">Volver a proyectos</Back>
          <Title>{project.title}</Title>
          <Lead>{project.summary}</Lead>
          <Photo src={project.image} alt="" />
        </Reveal>
      </Container>
    </PageFrame>
  );
};

export default ProjectDetail;
