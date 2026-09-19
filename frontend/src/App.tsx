/**
 * Componente principal de la aplicación DataLab
 * Maneja el routing y la estructura general
 * Versión mejorada con Error Boundaries
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

// Componentes de layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Componentes comunes
import ScrollToTop from './components/common/ScrollToTop';
import ErrorBoundary from './components/common/ErrorBoundary';

// Páginas
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <ScrollToTop />
          <div className="App">
            <a className="sr-only" href="#contenido">
              Saltar al contenido
            </a>
            <Header />
            <ErrorBoundary>
              <main id="contenido">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/sobre-nosotros" element={<About />} />
                  <Route path="/proyectos" element={<Projects />} />
                  <Route path="/proyectos/:id" element={<ProjectDetail />} />
                  <Route path="/contacto" element={<Contact />} />
                </Routes>
              </main>
            </ErrorBoundary>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;