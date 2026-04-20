/**
 * Componente Header - Navegación principal
 * Diseño responsivo con menú hamburguesa en móvil
 */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
// Iconos reemplazados por texto para evitar problemas de TypeScript

// Interfaces
interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

// Styled Components
const HeaderContainer = styled.header<{ isScrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  background: ${({ theme, isScrolled }) => 
    isScrolled ? 'rgba(255, 255, 255, 0.95)' : theme.colors.background};
  backdrop-filter: ${({ isScrolled }) => isScrolled ? 'blur(10px)' : 'none'};
  border-bottom: 1px solid ${({ theme, isScrolled }) => 
    isScrolled ? theme.colors.border : 'transparent'};
  transition: ${({ theme }) => theme.transitions.base};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-left: ${({ theme }) => theme.spacing.xl};
    padding-right: ${({ theme }) => theme.spacing.xl};
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    text-decoration: none;
    transform: scale(1.05);
  }
`;

const DesktopNav = styled.ul`
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.accent : theme.colors.text};
  font-weight: ${({ theme, isActive }) => 
    isActive ? theme.fontWeights.semibold : theme.fontWeights.medium};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.fast};
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    text-decoration: none;
  }

  ${({ isActive, theme }) => isActive && `
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background-color: ${theme.colors.accent};
      border-radius: ${theme.borderRadius.full};
    }
  `}
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  justify-content: flex-end;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileMenuContent = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background};
  width: 280px;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  overflow-y: auto;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const MobileNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MobileNavItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const MobileNavLink = styled(Link)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.accent : theme.colors.text};
  font-weight: ${({ theme, isActive }) => 
    isActive ? theme.fontWeights.semibold : theme.fontWeights.medium};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.fast};
  background-color: ${({ theme, isActive }) => 
    isActive ? theme.colors.backgroundAlt : 'transparent'};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    text-decoration: none;
  }
`;

// Navegación principal
const navItems: NavItem[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Sobre Nosotros', path: '/sobre-nosotros' },
  { label: 'Proyectos', path: '/proyectos' },
  { label: 'Contacto', path: '/contacto' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <Nav>
        {/* Logo */}
        <LogoLink to="/">
          <img 
            src={`${process.env.PUBLIC_URL ?? ''}/logo_datalab_con_texto.jpg`}
            alt="DataLab ITAM" 
            style={{ height: '40px', width: 'auto' }}
          />
        </LogoLink>

        {/* Navegación Desktop */}
        <DesktopNav>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                isActive={location.pathname === item.path}
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </DesktopNav>

        {/* Botón menú móvil */}
        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <MobileMenuContent
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <MobileMenuHeader>
                <LogoLink to="/">
                  <img 
                    src={`${process.env.PUBLIC_URL ?? ''}/logo_datalab_con_texto.jpg`}
                    alt="DataLab ITAM" 
                    style={{ height: '36px', width: 'auto' }}
                  />
                </LogoLink>
                <MobileMenuButton onClick={toggleMobileMenu}>
                  ✕
                </MobileMenuButton>
              </MobileMenuHeader>

              <MobileNavList>
                {navItems.map((item) => (
                  <MobileNavItem key={item.path}>
                    <MobileNavLink 
                      to={item.path} 
                      isActive={location.pathname === item.path}
                    >
                      {item.icon}
                      {item.label}
                    </MobileNavLink>
                  </MobileNavItem>
                ))}
              </MobileNavList>
            </MobileMenuContent>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
