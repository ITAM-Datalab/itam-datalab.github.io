/**
 * Botón del sistema: pill, un acento naranja para primario, teal outline.
 */
import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const buttonVariants = {
  primary: css`
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.ink};
    border: 1px solid ${({ theme }) => theme.colors.accent};

    &:hover:not(:disabled) {
      background: #c87b16;
      border-color: #c87b16;
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.paperElevated};
    color: ${({ theme }) => theme.colors.ink};
    border: 1px solid ${({ theme }) => theme.colors.hairline};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.ink};
    }
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid rgba(247, 246, 242, 0.55);

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.white};
      background: rgba(247, 246, 242, 0.08);
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.ink};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.teal};
    }
  `,
};

const buttonSizes = {
  sm: css`
    padding: 0.45rem 1rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    min-height: 36px;
  `,
  md: css`
    padding: 0.7rem 1.25rem;
    font-size: ${({ theme }) => theme.fontSizes.base};
    min-height: 44px;
  `,
  lg: css`
    padding: 0.85rem 1.5rem;
    font-size: ${({ theme }) => theme.fontSizes.md};
    min-height: 52px;
  `,
};

const StyledButton = styled(motion.button)<ButtonProps & { $fullWidth?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  text-decoration: none;
  white-space: nowrap;
  user-select: none;

  ${({ variant = 'primary' }) => buttonVariants[variant]}
  ${({ size = 'md' }) => buttonSizes[size]}
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  className,
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      className={className}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
    >
      {leftIcon}
      {loading ? 'Enviando' : children}
      {rightIcon}
    </StyledButton>
  );
};

export default Button;
