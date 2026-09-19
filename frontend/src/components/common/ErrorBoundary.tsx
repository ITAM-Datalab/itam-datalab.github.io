/**
 * Error Boundary Component
 * Captura errores en componentes hijos y muestra UI de fallback
 */
import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// Styled Components para UI de error
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const ErrorTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 600px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ErrorDetails = styled.details`
  max-width: 800px;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: left;
  
  summary {
    cursor: pointer;
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.error};
  }
  
  pre {
    overflow-x: auto;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textDark};
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

const ReloadButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.teal};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Actualizar estado para renderizar UI de fallback
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log del error
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    
    // Callback opcional para logging externo (ej: Sentry)
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // En producción, aquí se puede enviar a servicio de tracking
    if (process.env.NODE_ENV === 'production') {
      // TODO: Enviar a Sentry u otro servicio de monitoring
      // logErrorToService(error, errorInfo);
    }
  }

  handleReload = () => {
    // Recargar la página
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Renderizar fallback custom si se proporciona
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Renderizar UI de error por defecto
      return (
        <ErrorContainer>
          <ErrorTitle>Algo salió mal</ErrorTitle>
          <ErrorMessage>
            Lo sentimos, ha ocurrido un error inesperado. 
            Por favor intenta recargar la página.
          </ErrorMessage>
          
          <ReloadButton onClick={this.handleReload}>
            Recargar página
          </ReloadButton>

          {/* Mostrar detalles del error solo en desarrollo */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <ErrorDetails>
              <summary>Detalles del error (solo en desarrollo)</summary>
              <pre>{this.state.error.toString()}</pre>
              <pre>{this.state.error.stack}</pre>
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    // Renderizar children normalmente si no hay error
    return this.props.children;
  }
}

export default ErrorBoundary;

