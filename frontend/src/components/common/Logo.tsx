/**
 * Marca DataLab: cubo hexagonal + wordmark. El color del texto sigue al contexto.
 */
import React from 'react';
import styled from 'styled-components';

const Mark = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
`;

const Symbol = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
`;

const Word = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1;
  color: inherit;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.72rem;
`;

interface LogoProps {
  size?: number;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 36, showText = true }) => {
  const src = `${process.env.PUBLIC_URL ?? ''}/logo_png.png`;

  return (
    <Mark>
      <Symbol src={src} alt="" width={size} height={size} />
      {showText && (
        <Word>
          <span>Datalab</span>
          <span>ITAM</span>
        </Word>
      )}
    </Mark>
  );
};

export default Logo;
