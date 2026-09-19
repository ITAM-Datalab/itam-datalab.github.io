/**
 * Pie de página en papel. Sin gradiente. Tres columnas y datos de contacto.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../common/Logo';
import Container from './Container';

const FooterWrap = styled.footer`
  background: ${({ theme }) => theme.colors.paper};
  color: ${({ theme }) => theme.colors.ink};
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};
  padding: ${({ theme }) => theme.spacing['3xl']} 0 ${({ theme }) => theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1.4fr 1fr 1fr;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  color: ${({ theme }) => theme.colors.ink};

  p {
    color: ${({ theme }) => theme.colors.inkMuted};
    max-width: 32ch;
    margin: 0;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.95rem;

  &:hover {
    color: ${({ theme }) => theme.colors.teal};
  }
`;

const ExtLink = styled.a`
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.95rem;

  &:hover {
    color: ${({ theme }) => theme.colors.teal};
  }
`;

const Meta = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
  margin: 0;
  max-width: none;
`;

const Bottom = styled.div`
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.85rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <FooterWrap>
      <Container>
        <Grid>
          <Brand>
            <Logo />
            <p>Datos para el cambio social</p>
          </Brand>

          <Col>
            <FooterLink to="/">Inicio</FooterLink>
            <FooterLink to="/sobre-nosotros">Sobre nosotros</FooterLink>
            <FooterLink to="/proyectos">Proyectos</FooterLink>
            <FooterLink to="/contacto">Contacto</FooterLink>
            <ExtLink href="https://www.itam.mx" target="_blank" rel="noopener noreferrer">
              ITAM
            </ExtLink>
            <ExtLink
              href="https://github.com/ITAM-Datalab"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </ExtLink>
          </Col>

          <Col>
            <Meta>itamdatalab@gmail.com</Meta>
            <Meta>Río Hondo 1, Progreso Tizapán</Meta>
            <Meta>01080 Ciudad de México</Meta>
          </Col>
        </Grid>

        <Bottom>
          <span>© {year} DataLab ITAM</span>
          <a href="https://www.itam.mx" target="_blank" rel="noopener noreferrer">
            Instituto Tecnológico Autónomo de México
          </a>
        </Bottom>
      </Container>
    </FooterWrap>
  );
};

export default Footer;
