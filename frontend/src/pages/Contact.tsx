/**
 * Únete al DataLab: panel de invitación + formulario en tres pasos.
 * Conserva nombres de campo, reglas de validación y el webhook existente.
 */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from '@phosphor-icons/react';
import Container from '../components/layout/Container';
import PageFrame from '../components/layout/PageFrame';
import Reveal from '../components/common/Reveal';
import Button from '../components/ui/Button';

const GOOGLE_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbwqnvkf9-VQrQCOtLoZ7HojP47mbxMrXQjXC_jPNxTJQzCb3eqi3evhv0CMhw7VgAE5/exec';

interface FormData {
  nombre: string;
  cu: string;
  email: string;
  telefono: string;
  area: string;
}

type FieldName = keyof FormData;
type FormErrors = Partial<Record<FieldName, string>>;

const EMPTY_FORM: FormData = { nombre: '', cu: '', email: '', telefono: '', area: '' };

const steps: { title: string; fields: FieldName[] }[] = [
  { title: '¿Quién eres?', fields: ['nombre', 'cu'] },
  { title: '¿Cómo te contactamos?', fields: ['email', 'telefono'] },
  { title: '¿Dónde quieres aportar?', fields: ['area'] },
];

const areas = [
  { value: 'direccion-general', label: 'Dirección General' },
  { value: 'proyectos', label: 'Área de Proyectos' },
  { value: 'investigacion', label: 'Área de Investigación y Desarrollo' },
  { value: 'calidad', label: 'Área de Calidad, Comunicación y Diseño' },
  { value: 'operaciones', label: 'Área de Operaciones' },
  { value: 'talento', label: 'Área de Talento y Cultura' },
];

const timeline = [
  'Llenas el formulario, son tres pasos cortos.',
  'Te contactamos en un plazo de 2 a 3 días hábiles.',
  'Te sumas a un equipo y empiezas a construir.',
];

const validators: Record<FieldName, (data: FormData) => string | undefined> = {
  nombre: (d) => (!d.nombre.trim() ? 'El nombre es requerido' : undefined),
  cu: (d) => {
    if (!d.cu.trim()) return 'La CU es requerida';
    if (!/^\d{6}$/.test(d.cu.trim())) return 'La CU debe tener 6 dígitos';
    return undefined;
  },
  email: (d) => {
    if (!d.email.trim()) return 'El correo es requerido';
    if (!d.email.includes('@itam.mx')) return 'Debe ser un correo @itam.mx';
    return undefined;
  },
  telefono: (d) => {
    if (!d.telefono.trim()) return 'El teléfono es requerido';
    if (!/^\d{10}$/.test(d.telefono.replace(/\s/g, ''))) return 'El teléfono debe tener 10 dígitos';
    return undefined;
  },
  area: (d) => (!d.area ? 'Selecciona un área de interés' : undefined),
};

const validate = (data: FormData, fields: FieldName[]): FormErrors => {
  const next: FormErrors = {};
  fields.forEach((field) => {
    const message = validators[field](data);
    if (message) next[field] = message;
  });
  return next;
};

/* ---------- Estilos ---------- */

const Shell = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 0.85fr 1.15fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: clamp(1.75rem, 4vw, 3rem);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.teal};
  color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  max-width: 10ch;
  margin-bottom: 0.9rem;
`;

const Lead = styled.p`
  color: rgba(247, 246, 242, 0.85);
  font-size: 1.05rem;
  margin: 0;
`;

const Timeline = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  counter-reset: paso;

  li {
    position: relative;
    counter-increment: paso;
    padding-left: 2.6rem;
    color: rgba(247, 246, 242, 0.9);
    font-size: 0.98rem;
    line-height: 1.45;
  }

  li::before {
    content: counter(paso);
    position: absolute;
    left: 0;
    top: -0.15rem;
    width: 1.85rem;
    height: 1.85rem;
    display: grid;
    place-items: center;
    border: 1px solid rgba(247, 246, 242, 0.5);
    border-radius: 50%;
    font-size: 0.85rem;
    font-variant-numeric: tabular-nums;
  }

  li:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 0.92rem;
    top: 1.8rem;
    bottom: -1rem;
    width: 1px;
    background: rgba(247, 246, 242, 0.28);
  }
`;

const Direct = styled.div`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid rgba(247, 246, 242, 0.25);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.98rem;

  span {
    color: rgba(247, 246, 242, 0.7);
    font-size: 0.85rem;
    margin-bottom: 0.15rem;
  }

  a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-color: rgba(247, 246, 242, 0.45);
  }

  a:hover {
    color: ${({ theme }) => theme.colors.white};
    text-decoration-color: ${({ theme }) => theme.colors.white};
  }

  p {
    margin: 0;
    max-width: none;
  }
`;

const Card = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: clamp(1.5rem, 4vw, 2.75rem);
  border: 1px solid ${({ theme }) => theme.colors.hairline};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.paperElevated};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 34rem;
  }
`;

const BigNumber = styled(motion.span)`
  position: absolute;
  top: 0.6rem;
  right: 1.75rem;
  font-size: clamp(5rem, 11vw, 8.5rem);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.05em;
  color: ${({ theme }) => theme.colors.borderLight};
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  user-select: none;
`;

const Progress = styled.div`
  position: relative;
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.9rem;
  max-width: 14rem;
`;

const Segment = styled.span`
  position: relative;
  flex: 1;
  height: 3px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.hairline};
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.teal};
    transform: scaleX(var(--fill, 0));
    transform-origin: left;
    transition: transform 520ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

const StepKicker = styled.p`
  position: relative;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
`;

const StepTitle = styled.h2`
  position: relative;
  font-size: clamp(1.7rem, 3.2vw, 2.4rem);
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 16ch;
`;

/* flex: 1 empuja los botones al borde inferior de la tarjeta en los tres pasos. */
const Form = styled.form`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Pane = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  min-height: 12.5rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const Underline = styled.input`
  width: 100%;
  padding: 0.35rem 0 0.6rem;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.hairline};
  border-radius: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.ink};
  font-size: 1.35rem;
  transition: border-color 180ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
    border-bottom-color: ${({ theme }) => theme.colors.teal};
  }

  &[aria-invalid='true'] {
    border-bottom-color: ${({ theme }) => theme.colors.error};
  }
`;

const Hint = styled.p`
  min-height: 1.3rem;
  margin: 0;
  max-width: none;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;

const Fieldset = styled.fieldset`
  border: none;
  min-width: 0;

  legend {
    padding: 0;
    margin-bottom: 0.9rem;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.inkMuted};
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const Chip = styled.label`
  position: relative;
  cursor: pointer;

  input {
    position: absolute;
    opacity: 0;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    cursor: pointer;
  }

  span {
    display: inline-block;
    padding: 0.6rem 1.05rem;
    border: 1px solid ${({ theme }) => theme.colors.hairline};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background: ${({ theme }) => theme.colors.paper};
    color: ${({ theme }) => theme.colors.ink};
    font-size: 0.98rem;
    transition: background 180ms, border-color 180ms, color 180ms;
  }

  &:hover span {
    border-color: ${({ theme }) => theme.colors.teal};
  }

  input:checked + span {
    background: ${({ theme }) => theme.colors.teal};
    border-color: ${({ theme }) => theme.colors.teal};
    color: ${({ theme }) => theme.colors.white};
  }

  input:focus-visible + span {
    outline: 2px solid ${({ theme }) => theme.colors.teal};
    outline-offset: 3px;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
`;

const SubmitError = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
`;

const Success = styled(motion.div)`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg} 0;

  svg {
    color: ${({ theme }) => theme.colors.teal};
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  p {
    color: ${({ theme }) => theme.colors.inkMuted};
    margin: 0;
  }
`;

/* ---------- Campo de texto ---------- */

interface TextFieldProps {
  name: FieldName;
  label: string;
  hint: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: 'numeric' | 'tel' | 'email' | 'text';
  maxLength?: number;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  hint,
  value,
  error,
  onChange,
  autoFocus,
  type = 'text',
  autoComplete,
  inputMode,
  maxLength,
}) => (
  <Field>
    <Label htmlFor={name}>{label}</Label>
    <Underline
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      inputMode={inputMode}
      maxLength={maxLength}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={`${name}-hint`}
    />
    <Hint id={`${name}-hint`}>
      {error ? <ErrorText role="alert">{error}</ErrorText> : hint}
    </Hint>
  </Field>
);

/* ---------- Página ---------- */

const Contact: React.FC = () => {
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const isLast = step === steps.length - 1;
  const shift = reduce ? 0 : 28;

  const focusFirstInvalid = () => {
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as FieldName]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setTouched(true);
    setErrors({});
    setSubmitError('');
    setStep(next);
  };

  const send = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const params = new URLSearchParams();
      params.append('nombre', formData.nombre);
      params.append('cu', formData.cu);
      params.append('email', formData.email);
      params.append('telefono', formData.telefono);
      params.append('area', formData.area);
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: params,
      });
      setIsSuccess(true);
      setFormData(EMPTY_FORM);
    } catch {
      setSubmitError('No se pudo enviar. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const stepErrors = validate(formData, steps[step].fields);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      focusFirstInvalid();
      return;
    }

    if (!isLast) {
      goTo(step + 1);
      return;
    }

    // Último paso: revisa todo por si algo quedó inválido en pasos anteriores.
    const allErrors = validate(formData, steps.flatMap((s) => s.fields));
    if (Object.keys(allErrors).length > 0) {
      const firstBad = steps.findIndex((s) => s.fields.some((f) => allErrors[f]));
      setDirection(-1);
      setStep(firstBad);
      setErrors(allErrors);
      focusFirstInvalid();
      return;
    }

    await send();
  };

  return (
    <PageFrame>
      <Container>
        <Reveal>
          <Shell>
            <Aside>
              <div>
                <Title>Únete al DataLab</Title>
                <Lead>Completa el formulario y cuéntanos en qué área quieres contribuir.</Lead>
              </div>

              <Timeline aria-label="Qué sigue después de postularte">
                {timeline.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </Timeline>

              <Direct>
                <span>¿Prefieres escribirnos?</span>
                <p>
                  <a href="mailto:itamdatalab@gmail.com">itamdatalab@gmail.com</a>
                </p>
                <p>
                  <a href="tel:+524772632418">+52 477 263 2418</a>
                </p>
                <p>@datalabitam</p>
              </Direct>
            </Aside>

            <Card>
              {isSuccess ? (
                <Success
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CheckCircle size={56} weight="light" aria-hidden="true" />
                  <h2>Solicitud enviada</h2>
                  <p>Te contactaremos en un plazo de 2 a 3 días hábiles.</p>
                  <Link to="/proyectos">
                    <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={18} />}>
                      Mientras tanto, conoce los proyectos
                    </Button>
                  </Link>
                </Success>
              ) : (
                <>
                  <AnimatePresence mode="wait" initial={false}>
                    <BigNumber
                      key={step}
                      aria-hidden="true"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {String(step + 1).padStart(2, '0')}
                    </BigNumber>
                  </AnimatePresence>

                  <Progress aria-hidden="true">
                    {steps.map((s, index) => (
                      <Segment
                        key={s.title}
                        style={{ '--fill': index <= step ? 1 : 0 } as React.CSSProperties}
                      />
                    ))}
                  </Progress>
                  <StepKicker aria-live="polite">
                    Paso {step + 1} de {steps.length}
                  </StepKicker>
                  <StepTitle>{steps[step].title}</StepTitle>

                  <Form ref={formRef} onSubmit={handleSubmit} noValidate>
                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                      <Pane
                        key={step}
                        custom={direction}
                        variants={{
                          enter: (d: number) => ({ opacity: 0, x: d * shift }),
                          center: { opacity: 1, x: 0 },
                          exit: (d: number) => ({ opacity: 0, x: d * -shift }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: reduce ? 0 : 0.26, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {step === 0 && (
                          <>
                            <TextField
                              name="nombre"
                              label="Nombre completo"
                              hint="Nombre y apellidos"
                              value={formData.nombre}
                              error={errors.nombre}
                              onChange={handleChange}
                              autoComplete="name"
                              autoFocus={touched}
                            />
                            <TextField
                              name="cu"
                              label="CU"
                              hint="Tu clave única, 6 dígitos"
                              value={formData.cu}
                              error={errors.cu}
                              onChange={handleChange}
                              maxLength={6}
                              inputMode="numeric"
                            />
                          </>
                        )}

                        {step === 1 && (
                          <>
                            <TextField
                              name="email"
                              label="Correo del ITAM"
                              hint="Debe terminar en @itam.mx"
                              type="email"
                              value={formData.email}
                              error={errors.email}
                              onChange={handleChange}
                              autoComplete="email"
                              autoFocus={touched}
                            />
                            <TextField
                              name="telefono"
                              label="Teléfono"
                              hint="10 dígitos"
                              type="tel"
                              value={formData.telefono}
                              error={errors.telefono}
                              onChange={handleChange}
                              autoComplete="tel"
                              inputMode="tel"
                            />
                          </>
                        )}

                        {step === 2 && (
                          <Fieldset>
                            <legend>Área de interés</legend>
                            <Chips role="radiogroup" aria-label="Área de interés">
                              {areas.map((area) => (
                                <Chip key={area.value}>
                                  <input
                                    type="radio"
                                    name="area"
                                    value={area.value}
                                    checked={formData.area === area.value}
                                    onChange={handleChange}
                                    aria-invalid={errors.area ? 'true' : undefined}
                                  />
                                  <span>{area.label}</span>
                                </Chip>
                              ))}
                            </Chips>
                            <Hint style={{ marginTop: '0.75rem' }}>
                              {errors.area && <ErrorText role="alert">{errors.area}</ErrorText>}
                            </Hint>
                          </Fieldset>
                        )}
                      </Pane>
                    </AnimatePresence>

                    {submitError && <SubmitError role="alert">{submitError}</SubmitError>}

                    <Actions>
                      {step > 0 ? (
                        <Button
                          variant="ghost"
                          size="md"
                          leftIcon={<ArrowLeft size={18} />}
                          onClick={() => goTo(step - 1)}
                        >
                          Atrás
                        </Button>
                      ) : (
                        <span />
                      )}
                      <Button
                        type="submit"
                        size="lg"
                        loading={isSubmitting}
                        rightIcon={isLast ? undefined : <ArrowRight size={18} />}
                      >
                        {isLast ? 'Enviar solicitud' : 'Continuar'}
                      </Button>
                    </Actions>
                  </Form>
                </>
              )}
            </Card>
          </Shell>
        </Reveal>
      </Container>
    </PageFrame>
  );
};

export default Contact;
