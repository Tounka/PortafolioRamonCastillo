import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Alterna entre varios textos manteniendo cada uno visible `intervalo` ms.
 * Antes de cambiar marca la fase "out" para que el componente reproduzca
 * su animación de salida; el avance real ocurre cuando esa salida termina.
 */
export const useTextoRotativo = (textos, intervalo = 30000) => {
  const [indice, setIndice] = useState(0);
  const [fase, setFase] = useState("in");
  const temporizadorRef = useRef(null);

  const total = textos.length;

  useEffect(() => {
    if (total < 2) return undefined;
    // Durante la salida no se programa nada: el avance lo dispara la animación.
    if (fase !== "in") return undefined;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    temporizadorRef.current = window.setTimeout(() => {
      if (reduceMotion) {
        setIndice(actual => (actual + 1) % total);
        return;
      }
      setFase("out");
    }, intervalo);

    return () => window.clearTimeout(temporizadorRef.current);
  }, [indice, fase, intervalo, total]);

  const alTerminarSalida = useCallback(() => {
    setIndice(actual => (actual + 1) % total);
    setFase("in");
  }, [total]);

  return { texto: textos[indice], fase, alTerminarSalida, indice };
};
