/**
 * Suscripción a una media query. Devuelve false donde matchMedia no existe (tests, SSR).
 */
import { useEffect, useState } from 'react';

const supportsMatchMedia = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() =>
    supportsMatchMedia() ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (!supportsMatchMedia()) return undefined;
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;
