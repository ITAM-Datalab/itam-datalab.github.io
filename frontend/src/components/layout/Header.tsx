/**
 * Navegación fija de una línea. En Home va sobre la foto; al hacer scroll, papel.
 */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { List, X } from '@phosphor-icons/react';
import Logo from '../common/Logo';

interface NavItem {
  label: string;
  path: string;
}

const HeaderContainer = styled.header<{ $solid: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  height: 72px;
  background: ${({ $solid, theme }) =>
    $solid ? 'rgba(243, 241, 236, 0.92)' : 'transparent'};
  backdrop-filter: ${({ $solid }) => ($solid ? 'blur(16px)' : 'none')};
  border-bottom: 1px solid
    ${({ $solid, theme }) => ($solid ? theme.colors.hairline : 'transparent')};
  color: ${({ $solid, theme }) =>
    $solid ? theme.colors.ink : theme.colors.white};
  transition: background 280ms cubic-bezier(0.16, 1, 0.3, 1),
    color 280ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 280ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

const DesktopNav = styled.ul`
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  color: inherit;
  font-size: 0.95rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  opacity: ${({ $active }) => ($active ? 1 : 0.78)};
  text-decoration: none;

  &:hover {
    opacity: 1;
    color: inherit;
    text-decoration: none;
  }
`;

const MenuButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.paper};
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: 1.5rem;
  color: ${({ theme }) => theme.colors.ink};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const OverlayTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
`;

const OverlayList = styled.ul`
  list-style: none;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OverlayLink = styled(Link)`
  font-size: 2rem;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 500;
`;

const navItems: NavItem[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Sobre nosotros', path: '/sobre-nosotros' },
  { label: 'Proyectos', path: '/proyectos' },
  { label: 'Contacto', path: '/contacto' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const isHome = location.pathname === '/';
  const solid = !isHome || isScrolled || open;

  useMotionValueEvent(scrollY, 'change', (value) => {
    setIsScrolled(value > 16);
  });

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <HeaderContainer $solid={solid}>
      <Nav>
        <LogoLink to="/" aria-label="DataLab ITAM">
          <Logo />
        </LogoLink>

        <DesktopNav>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} $active={location.pathname === item.path}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </DesktopNav>

        <MenuButton
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </MenuButton>
      </Nav>

      <AnimatePresence>
        {open && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <OverlayTop>
              <LogoLink to="/">
                <Logo />
              </LogoLink>
              <MenuButton type="button" aria-label="Cerrar menú" onClick={() => setOpen(false)}>
                <X size={22} />
              </MenuButton>
            </OverlayTop>
            <OverlayList>
              {navItems.map((item) => (
                <li key={item.path}>
                  <OverlayLink to={item.path}>{item.label}</OverlayLink>
                </li>
              ))}
            </OverlayList>
          </Overlay>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
