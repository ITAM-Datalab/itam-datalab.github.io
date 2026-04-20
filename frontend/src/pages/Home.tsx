/**
 * Página principal - Home
 * Hero section, proyectos destacados, sobre nosotros
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// Iconos reemplazados por emojis para evitar problemas de TypeScript
import Button from '../components/ui/Button';
import GeometricElements from '../components/common/GeometricElements';

// Styled Components
const HomeContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #0a0a0a;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 25%, ${({ theme }) => theme.colors.primary}15 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, ${({ theme }) => theme.colors.secondary}12 0%, transparent 50%),
      linear-gradient(135deg, transparent 0%, ${({ theme }) => theme.colors.primary}05 50%, transparent 100%);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(90deg, transparent 0%, ${({ theme }) => theme.colors.primary}08 50%, transparent 100%),
      linear-gradient(0deg, transparent 0%, ${({ theme }) => theme.colors.secondary}06 50%, transparent 100%);
    animation: pulse 4s ease-in-out infinite alternate;
  }

  @keyframes pulse {
    0% { opacity: 0.3; }
    100% { opacity: 0.7; }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`;

const HeroText = styled(motion.div)`
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    text-align: left;
  }
`;

const HeroBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: rgba(45, 125, 125, 0.2);
  border: 1px solid rgba(45, 125, 125, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  backdrop-filter: blur(10px);

  &::before {
    content: '🚀';
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  line-height: 1.1;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: #ffffff;
  text-shadow: 0 0 30px ${({ theme }) => theme.colors.primary}50;

  span.highlight {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
  max-width: 600px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-right: auto;
    margin-left: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const HeroActions = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: flex-start;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const HeroVisual = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HeroCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  max-width: 400px;
  width: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}10, ${({ theme }) => theme.colors.secondary}08);
    z-index: -1;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StatItem = styled.div`
  text-align: center;

  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }
`;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.textLight};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ValueCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const ValueIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
`;

const ValueTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textDark};
`;

const ValueDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin: 0;
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  color: ${({ theme }) => theme.colors.textWhite};
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  text-align: center;

  h2 {
    color: ${({ theme }) => theme.colors.textWhite};
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    opacity: 0.9;
  }
`;

// Datos de valores
const values = [
  {
    icon: '❤️',
    title: 'Impacto Social',
    description: 'Nos enfocamos en proyectos que generen un impacto positivo en la sociedad mexicana.'
  },
  {
    icon: '📈',
    title: 'Innovación',
    description: 'Utilizamos tecnologías emergentes para crear soluciones innovadoras y efectivas.'
  },
  {
    icon: '👥',
    title: 'Colaboración',
    description: 'Trabajamos en equipo y con la comunidad para maximizar nuestro impacto.'
  },
  {
    icon: '🌍',
    title: 'Transparencia',
    description: 'Mantenemos la transparencia en nuestros procesos y compartimos nuestro conocimiento.'
  }
];

const Home: React.FC = () => {
  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection>
        <GeometricElements />
        <HeroContent>
          <HeroText>
            <HeroBadge
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Análisis de Datos Profesional
            </HeroBadge>
            <HeroTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transformamos Ideas en{' '}
              <span className="highlight">Desarrollo</span>
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Somos estudiantes del ITAM preocupadxs por problemáticas sociales, 
              económicas y ambientales en México y el mundo. Desarrollamos software, 
              visualizaciones y soluciones con datos.
            </HeroSubtitle>
            <HeroActions
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/proyectos">
                <Button 
                  size="lg"
                  rightIcon={<span>→</span>}
                >
                  Ver Proyectos
                </Button>
              </Link>
              <Link to="/sobre-nosotros">
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Conoce el Equipo
                </Button>
              </Link>
            </HeroActions>
          </HeroText>

          <HeroVisual>
            <HeroCard
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <StatsGrid>
                <StatItem>
                  <h3>15+</h3>
                  <p>Proyectos</p>
                </StatItem>
                <StatItem>
                  <h3>30+</h3>
                  <p>Estudiantes</p>
                </StatItem>
                <StatItem>
                  <h3>5</h3>
                  <p>Áreas de Impacto</p>
                </StatItem>
                <StatItem>
                  <h3>100%</h3>
                  <p>Open Source</p>
                </StatItem>
              </StatsGrid>
              <div style={{ textAlign: 'center' }}>
                <img 
                  src={`${process.env.PUBLIC_URL ?? ''}/logo_png.png`}
                  alt="DataLab ITAM" 
                  style={{ 
                    width: '64px', 
                    height: '64px', 
                    objectFit: 'contain',
                    margin: '0 auto'
                  }}
                />
                <p style={{ margin: '16px 0 0', color: 'rgba(255, 255, 255, 0.7)' }}>
                  Datos para el cambio social
                </p>
              </div>
            </HeroCard>
          </HeroVisual>
        </HeroContent>
      </HeroSection>

      {/* Valores Section */}
      <Section>
        <Container>
          <SectionHeader>
            <h2>Nuestros Valores</h2>
            <p>
              Los principios que guían nuestro trabajo y nos motivan a crear 
              soluciones que realmente importen.
            </p>
          </SectionHeader>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <ValueIcon>{value.icon}</ValueIcon>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValuesGrid>
        </Container>
      </Section>

      {/* CTA Section */}
      <CTASection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>¿Quieres colaborar con nosotros?</h2>
            <p>
              Únete a nuestra comunidad de estudiantes comprometidos con el cambio social 
              a través de la tecnología y los datos.
            </p>
            <Link to="/contacto">
              <Button 
                variant="secondary" 
                size="lg"
                rightIcon={<span>→</span>}
              >
                Contáctanos
              </Button>
            </Link>
          </motion.div>
        </Container>
      </CTASection>
    </HomeContainer>
  );
};

export default Home;
