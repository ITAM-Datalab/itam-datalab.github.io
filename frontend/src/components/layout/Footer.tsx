/**
 * Componente Footer - Pie de página
 * Información de contacto, enlaces y redes sociales
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: white;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem 2rem;

  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: white;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const FooterLogo = styled.div`
  margin-bottom: 1rem;
  
  /* Estilos específicos para el logo en el footer */
  h2 {
    color: white !important;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7) !important;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
`;

const FooterLinks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    color: white;
    text-decoration: none;
    transform: translateX(4px);
  }
`;

const ExternalLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    color: white;
    text-decoration: none;
    transform: translateX(4px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  margin: 0;
`;

const ITAMLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          {/* Información principal */}
          <FooterSection>
            <FooterLogo>
              <img
                src={`${process.env.PUBLIC_URL ?? ''}/logo_datalab_con_texto.jpg`}
                alt="DataLab ITAM"
                style={{
                  height: '48px',
                  width: 'auto'
                }}
              />
            </FooterLogo>
            <p>
              Somos estudiantes del ITAM preocupadxs por problemáticas sociales,
              económicas y ambientales en México y el mundo. Desarrollamos software,
              visualizaciones y soluciones con datos.
            </p>
            <SocialLinks>
              <SocialLink
                href="https://github.com/ITAM-Datalab"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                GH
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/datalabitam?igsh=MXZoeGpldXFqM2k1Ng=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                IG
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          {/* Enlaces rápidos */}
          <FooterSection>
            <h3>Enlaces Rápidos</h3>
            <FooterLinks>
              <li>
                <FooterLink to="/sobre-nosotros">
                  Sobre Nosotros →
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/proyectos">
                  Nuestros Proyectos →
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/contacto">
                  Contacto →
                </FooterLink>
              </li>
            </FooterLinks>
          </FooterSection>

          {/* Recursos */}
          <FooterSection>
            <h3>Recursos</h3>
            <FooterLinks>
              <li>
                <ExternalLink
                  href="https://www.itam.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ITAM →
                </ExternalLink>
              </li>
              <li>
                <ExternalLink
                  href="https://github.com/ITAM-Datalab"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Código Abierto →
                </ExternalLink>
              </li>
            </FooterLinks>
          </FooterSection>

          {/* Contacto */}
          <FooterSection>
            <h3>Contacto</h3>
            <ContactInfo>
              <ContactItem>
                <span>📧</span>
                <span>datalab@itam.mx</span>
              </ContactItem>
              <ContactItem>
                <span>📞</span>
                <span>+52 55 5628 4000</span>
              </ContactItem>
              <ContactItem>
                <span>📍</span>
                <span>
                  Río Hondo 1, Progreso Tizapán<br />
                  01080 Ciudad de México, CDMX
                </span>
              </ContactItem>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            © {currentYear} DataLab ITAM. Todos los derechos reservados.
          </Copyright>
          <ITAMLink
            href="https://www.itam.mx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instituto Tecnológico Autónomo de México
          </ITAMLink>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;