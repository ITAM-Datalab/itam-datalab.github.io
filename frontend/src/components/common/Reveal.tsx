/**
 * Entrada al viewport. Solo transform y opacity. Respeta reduced-motion.
 */
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      // "some" dispara en cuanto asoma el borde del bloque; con amount fraccional,
      // los bloques altos tardaban en aparecer y dejaban huecos en blanco al hacer scroll.
      viewport={{ once: true, amount: 'some', margin: '0px 0px -60px 0px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
