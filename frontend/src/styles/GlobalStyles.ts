/**
 * Reset y base tipográfica. El sitio vive en papel + tinta, sin Inter.
 */
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.ink};
    background-color: ${({ theme }) => theme.colors.paper};
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    letter-spacing: -0.03em;
    line-height: 1.1;
    text-wrap: balance;
    color: ${({ theme }) => theme.colors.ink};
  }

  p {
    text-wrap: pretty;
    max-width: 65ch;
  }

  a {
    color: ${({ theme }) => theme.colors.teal};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.tealDeep};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.teal};
      outline-offset: 3px;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.teal};
      outline-offset: 3px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.teal};
    color: ${({ theme }) => theme.colors.white};
  }

  /* Footer al fondo en páginas cortas, sin forzar un hueco en blanco antes de él. */
  .App {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }

  .App > main {
    flex: 1 0 auto;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .sr-only:focus {
    position: fixed;
    top: 0.75rem;
    left: 0.75rem;
    width: auto;
    height: auto;
    margin: 0;
    clip: auto;
    overflow: visible;
    padding: 0.6rem 0.9rem;
    background: ${({ theme }) => theme.colors.ink};
    color: ${({ theme }) => theme.colors.white};
    z-index: ${({ theme }) => theme.zIndex.skipLink};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

export default GlobalStyles;
