/**
 * Home: ensambla las secciones del rediseño editorial.
 */
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import MetricsStrip from '../components/home/MetricsStrip';
import OficioSection from '../components/home/OficioSection';
import ProjectsTeaser from '../components/home/ProjectsTeaser';
import ValoresSection from '../components/home/ValoresSection';
import ComunidadSection from '../components/home/ComunidadSection';
import JoinCta from '../components/home/JoinCta';

const Home: React.FC = () => (
  <>
    <HeroSection />
    <MetricsStrip />
    <OficioSection />
    <ProjectsTeaser />
    <ValoresSection />
    <ComunidadSection />
    <JoinCta />
  </>
);

export default Home;
