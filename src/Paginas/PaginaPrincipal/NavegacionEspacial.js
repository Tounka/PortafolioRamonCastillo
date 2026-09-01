import {
  createElement,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { ContextoGeneral } from "./ContextoGeneral.jsx";
import { SeccionContacto } from "./SeccionContacto";
import { SeccionHabilidades } from "./SeccionHabilidades";
import { SeccionPrincipal } from "./SeccionPrincipal";
import { SeccionLineaDeTiempo } from "./SeccionLineaTiempo";
import { SeccionProyectosV2 } from "./SeccionProyectosV2";

const DURACION_TRANSICION = 760;

const MAPA_SECCIONES = {
  contacto: { columna: 1, fila: 0 },
  tecnologias: { columna: 0, fila: 1 },
  main: { columna: 1, fila: 1 },
  timeline: { columna: 2, fila: 1 },
  proyectos: { columna: 1, fila: 2 },
};

const DESTINOS_TECLADO = {
  main: {
    ArrowUp: "contacto",
    ArrowLeft: "tecnologias",
    ArrowRight: "timeline",
    ArrowDown: "proyectos",
  },
  contacto: { ArrowDown: "main" },
  tecnologias: { ArrowRight: "main" },
  timeline: { ArrowLeft: "main" },
  proyectos: { ArrowUp: "main" },
};

const normalizarSeccion = (seccion) => {
  const valor = String(seccion || "main").trim().toLowerCase();
  return MAPA_SECCIONES[valor] ? valor : "main";
};

const seccionParaVista = (seccion) =>
  normalizarSeccion(seccion) === "contacto" ? "Contacto" : normalizarSeccion(seccion);

const seccionDesdeHash = () => {
  if (typeof window === "undefined") return "main";
  return normalizarSeccion(
    decodeURIComponent(window.location.hash.replace(/^#/, "")),
  );
};

const destinoDeSeccion = (seccion, ancho, alto) => {
  const posicion = MAPA_SECCIONES[normalizarSeccion(seccion)];
  return {
    izquierda: posicion.columna * ancho,
    arriba: posicion.fila * alto,
  };
};

const suavizar = (progreso) =>
  progreso < 0.5
    ? 4 * progreso * progreso * progreso
    : 1 - Math.pow(-2 * progreso + 2, 3) / 2;

const Aplicacion = styled.main`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: black;
`;

const Visor = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  overscroll-behavior: none;
  scrollbar-width: none;
  touch-action: auto;
  opacity: ${(props) => (props.$listo ? 1 : 0)};
  transition: opacity 180ms ease;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus-visible {
    outline: 2px solid var(--AmarilloEspecial);
    outline-offset: -6px;
  }
`;

const Lienzo = styled.div`
  display: grid;
  width: 300%;
  min-width: 300%;
  height: 300%;
  min-height: 300%;
  grid-template-areas:
    ". contacto ."
    "tecnologias main timeline"
    ". proyectos .";
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
  background: black;
`;

const Zona = styled.div`
  position: relative;
  grid-area: ${(props) => props.$zona};
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;

  & > #Contacto,
  & > #proyectos {
    margin-left: 0 !important;
  }

  & > #timeline {
    overflow-x: auto !important;
    overflow-y: hidden !important;
    scrollbar-width: none;
  }

  & > #timeline::-webkit-scrollbar {
    display: none;
  }
`;

export const NavegacionEspacial = () => {
  const { setBoolSlider, setSeccionSeleccionada } = useContext(ContextoGeneral);
  const referenciaVisor = useRef(null);
  const seccionActualRef = useRef(seccionDesdeHash());
  const animacionRef = useRef(null);
  const animandoRef = useRef(false);
  const redimensionandoRef = useRef(false);
  const [listo, setListo] = useState(false);
  const [movimientoReducido, setMovimientoReducido] = useState(false);

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const actualizarPreferencia = () => setMovimientoReducido(consulta.matches);

    actualizarPreferencia();
    consulta.addEventListener("change", actualizarPreferencia);
    return () => consulta.removeEventListener("change", actualizarPreferencia);
  }, []);

  const cancelarAnimacion = useCallback(() => {
    if (animacionRef.current) {
      cancelAnimationFrame(animacionRef.current);
      animacionRef.current = null;
    }
    animandoRef.current = false;
  }, []);

  const enfocarSeccion = useCallback((seccion) => {
    const zona = document.querySelector(`[data-seccion="${seccion}"]`);
    zona?.focus({ preventScroll: true });
  }, []);

  const posicionarSinAnimacion = useCallback(
    (seccion) => {
      const visor = referenciaVisor.current;
      if (!visor) return;

      cancelarAnimacion();
      const destino = destinoDeSeccion(
        seccion,
        visor.clientWidth,
        visor.clientHeight,
      );
      visor.scrollLeft = destino.izquierda;
      visor.scrollTop = destino.arriba;
    },
    [cancelarAnimacion],
  );

  const irASeccion = useCallback(
    (
      seccion,
      { historial = "push", animar = true, enfocar = true } = {},
    ) => {
      const visor = referenciaVisor.current;
      if (!visor) return;

      const seccionValida = normalizarSeccion(seccion);
      const yaEstaEnSeccion = seccionActualRef.current === seccionValida;
      seccionActualRef.current = seccionValida;
      setSeccionSeleccionada(seccionParaVista(seccionValida));
      if (seccionValida !== "timeline") setBoolSlider(false);

      if (historial === "push" && !yaEstaEnSeccion) {
        window.history.pushState({ seccion: seccionValida }, "", `#${seccionValida}`);
      } else if (historial === "replace") {
        window.history.replaceState(
          { seccion: seccionValida },
          "",
          `#${seccionValida}`,
        );
      }

      const destino = destinoDeSeccion(
        seccionValida,
        visor.clientWidth,
        visor.clientHeight,
      );
      cancelarAnimacion();

      const desplazamientoHorizontal = destino.izquierda - visor.scrollLeft;
      const desplazamientoVertical = destino.arriba - visor.scrollTop;
      if (
        !animar ||
        movimientoReducido ||
        (Math.abs(desplazamientoHorizontal) < 1 &&
          Math.abs(desplazamientoVertical) < 1)
      ) {
        visor.scrollLeft = destino.izquierda;
        visor.scrollTop = destino.arriba;
        if (enfocar) enfocarSeccion(seccionValida);
        return;
      }

      const inicioHorizontal = visor.scrollLeft;
      const inicioVertical = visor.scrollTop;
      const inicio = performance.now();
      animandoRef.current = true;

      const animarPaso = (ahora) => {
        const progreso = Math.min(1, (ahora - inicio) / DURACION_TRANSICION);
        const avance = suavizar(progreso);

        visor.scrollLeft = inicioHorizontal + desplazamientoHorizontal * avance;
        visor.scrollTop = inicioVertical + desplazamientoVertical * avance;

        if (progreso < 1) {
          animacionRef.current = requestAnimationFrame(animarPaso);
          return;
        }

        animacionRef.current = null;
        animandoRef.current = false;
        visor.scrollLeft = destino.izquierda;
        visor.scrollTop = destino.arriba;
        if (enfocar) enfocarSeccion(seccionValida);
      };

      animacionRef.current = requestAnimationFrame(animarPaso);
    },
    [cancelarAnimacion, enfocarSeccion, movimientoReducido, setBoolSlider, setSeccionSeleccionada],
  );

  useLayoutEffect(() => {
    const seccionInicial = seccionDesdeHash();
    seccionActualRef.current = seccionInicial;
    setSeccionSeleccionada(seccionParaVista(seccionInicial));
    window.history.replaceState(
      { seccion: seccionInicial },
      "",
      `#${seccionInicial}`,
    );
    posicionarSinAnimacion(seccionInicial);
    setListo(true);

    return cancelarAnimacion;
  }, [cancelarAnimacion, posicionarSinAnimacion, setSeccionSeleccionada]);

  useEffect(() => {
    const visor = referenciaVisor.current;
    if (!visor) return undefined;

    let cuadroPendiente = null;
    const conservarSeccion = () => {
      const seccion = seccionActualRef.current;
      redimensionandoRef.current = true;

      cancelAnimationFrame(cuadroPendiente);

      cuadroPendiente = requestAnimationFrame(() => {
        posicionarSinAnimacion(seccion);
        cuadroPendiente = requestAnimationFrame(() => {
          posicionarSinAnimacion(seccion);
          redimensionandoRef.current = false;
        });
      });
    };

    const observador = new ResizeObserver(conservarSeccion);
    observador.observe(visor);
    window.addEventListener("resize", conservarSeccion);
    window.addEventListener("orientationchange", conservarSeccion);

    return () => {
      cancelAnimationFrame(cuadroPendiente);
      observador.disconnect();
      window.removeEventListener("resize", conservarSeccion);
      window.removeEventListener("orientationchange", conservarSeccion);
    };
  }, [posicionarSinAnimacion]);

  useEffect(() => {
    const restaurarDesdeHistorial = () => {
      irASeccion(seccionDesdeHash(), {
        historial: "none",
        animar: true,
        enfocar: false,
      });
    };

    window.addEventListener("popstate", restaurarDesdeHistorial);
    return () => window.removeEventListener("popstate", restaurarDesdeHistorial);
  }, [irASeccion]);

  const manejarTeclado = (evento) => {
    if (
      evento.target instanceof Element &&
      evento.target.closest("a, button, input, textarea, select, [contenteditable]")
    ) {
      return;
    }

    const destino = DESTINOS_TECLADO[seccionActualRef.current]?.[evento.key];
    if (!destino) return;

    evento.preventDefault();
    irASeccion(destino);
  };

  const crearZona = (zona, etiqueta, Seccion) =>
    createElement(
      Zona,
      {
        $zona: zona,
        "data-seccion": zona,
        tabIndex: "-1",
        "aria-label": etiqueta,
      },
      createElement(Seccion),
    );

  return createElement(
    Aplicacion,
    null,
    createElement(
      Visor,
      {
        ref: referenciaVisor,
        $listo: listo,
        tabIndex: "0",
        onKeyDown: manejarTeclado,
        "aria-label": "Portafolio navegable en cuatro direcciones",
      },
      createElement(
        Lienzo,
        null,
        crearZona("contacto", "Contacto", SeccionContacto),
        crearZona("tecnologias", "Tecnologías", SeccionHabilidades),
        crearZona("main", "Inicio", SeccionPrincipal),
        crearZona("timeline", "Mi historia", SeccionLineaDeTiempo),
        crearZona("proyectos", "Proyectos", SeccionProyectosV2),
      ),
    ),
  );
};
