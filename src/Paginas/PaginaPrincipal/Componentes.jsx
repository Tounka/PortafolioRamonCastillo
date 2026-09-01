import { useContext, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import styled from "styled-components";
import { ContextoGeneral } from "./ContextoGeneral";

const ControladorDpad = styled.div`
  --controlador-size: min(660px, 86vmin);
  --yellow: #fcb71c;
  --yellow-light: #ffe08a;
  --white: #fffaf0;
  --font-display: "Paytone One", sans-serif;
  --font-body: "Baloo 2", sans-serif;

  position: relative;
  width: var(--controlador-size);
  height: var(--controlador-size);
  display: grid;
  place-items: center;
  isolation: isolate;
  overflow: visible;

  &::before {
    content: "";
    position: absolute;
    inset: 19%;
    z-index: 0;
    border-radius: 50%;
    pointer-events: none;
    background: transparent;
    filter: none;
  }

  svg {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    overflow: visible;
  }

  .diamond-zone {
    cursor: pointer;
    outline: none;
    transform-box: fill-box;
    transform-origin: center;
  }


  .diamond-zone-glass {
    overflow: visible;
    pointer-events: none;
  }

  .diamond-zone-glass-surface {
    width: 124px;
    height: 124px;
    margin: 63px;
    border-radius: 18px;
    background: rgba(5, 6, 8, .24);
    backdrop-filter: blur(8px) saturate(125%);
    -webkit-backdrop-filter: blur(8px) saturate(125%);
    transform: rotate(45deg);
    transform-origin: center center;
  }
  .diamond-zone-shape {
    fill: rgba(255, 250, 240, .08);
    backdrop-filter: blur(8px) saturate(125%);
    -webkit-backdrop-filter: blur(8px) saturate(125%);
    stroke: var(--yellow);
    stroke-width: 2;
    stroke-linejoin: round;
    transition: fill 180ms ease, stroke 180ms ease, filter 180ms ease;
  }


  .diamond-zone:hover .diamond-zone-shape,
  .diamond-zone:focus-visible .diamond-zone-shape {
    fill: rgba(252, 183, 28, .22);
    stroke: var(--yellow-light);
    filter: drop-shadow(0 10px 12px rgba(0, 0, 0, .38));
  }


  .diamond-zone-label {
    fill: var(--white);
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 400;
    letter-spacing: .35px;
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
    user-select: none;
    transition: fill 180ms ease, filter 180ms ease;
  }

  .diamond-zone:hover .diamond-zone-label,
  .diamond-zone:focus-visible .diamond-zone-label {
    fill: #fff8dc;
    filter: none;
  }

  @media (max-width: 480px) {
    --controlador-size: min(560px, 100vw);

    .diamond-zone-label {
      font-size: 17px;
      letter-spacing: .1px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .diamond-zone-shape,
    .diamond-zone-label {
      transition: none;
    }
  }
`;

const DIAMOND_PATH = "M 0 -88 C 6 -88 10 -84 15 -79 L 79 -15 C 84 -10 88 -6 88 0 C 88 6 84 10 79 15 L 15 79 C 10 84 6 88 0 88 C -6 88 -10 84 -15 79 L -79 15 C -84 10 -88 6 -88 0 C -88 -6 -84 -10 -79 -15 L -15 -79 C -10 -84 -6 -88 0 -88 Z";

const activarConTecla = (evento, accion) => {
  if (evento.key === "Enter" || evento.key === " ") {
    evento.preventDefault();
    accion();
  }
};

const BotonRombo = ({
  etiqueta,
  ariaLabel,
  orden,
  transform,
  labelX = 0,
  labelY = 0,
  onClick,
  hoverX = 0,
  hoverY = 0,
}) => (
  <g transform={transform}>
    <motion.g
      className="diamond-zone"
      data-clockwise={orden}
      role="button"
      tabIndex="0"
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={(evento) => activarConTecla(evento, onClick)}
      whileHover={{ x: hoverX, y: hoverY }}
      whileFocus={{ x: hoverX, y: hoverY }}
      whileTap={{ scale: .97 }}
      transition={{ type: "spring", stiffness: 330, damping: 21, mass: .65 }}
    >
      <foreignObject
        className="diamond-zone-glass"
        x="-125"
        y="-125"
        width="250"
        height="250"
        pointerEvents="none"
      >
        <div xmlns="http://www.w3.org/1999/xhtml" className="diamond-zone-glass-surface" />
      </foreignObject>
      <path className="diamond-zone-shape" d={DIAMOND_PATH} />
      <text className="diamond-zone-label" x={labelX} y={labelY}>{etiqueta}</text>
    </motion.g>
  </g>
);

export const CuadradoContenedor = () => {
  const {
    setBoolSlider,
    setSeccionSeleccionada,
    navegarASeccion,
    seccionSeleccionada,
  } = useContext(ContextoGeneral);
  const controladorRef = useRef(null);

  const navegar = (seccion) => {
    if (navegarASeccion) {
      navegarASeccion(seccion);
      return;
    }

    const id = seccion === "contacto" ? "Contacto" : seccion;
    const elemento = document.getElementById(id);
    setSeccionSeleccionada(seccion === "contacto" ? "Contacto" : seccion);
    if (elemento) elemento.scrollIntoView({ behavior: "smooth" });
    if (seccion === "timeline") setBoolSlider(true);
  };

  useLayoutEffect(() => {
    if (seccionSeleccionada !== "main") return undefined;

    const root = controladorRef.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();
    media.add(
      {
        reducido: "(prefers-reduced-motion: reduce)",
        normal: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const motionReduced = Boolean(context.conditions.reducido);
        const select = gsap.utils.selector(root);
        const buttons = select(".diamond-zone").sort(
          (a, b) => Number(a.dataset.clockwise) - Number(b.dataset.clockwise)
        );

        if (!buttons.length) return undefined;

        gsap.set(buttons, { autoAlpha: 0 });

        if (!motionReduced) {
          gsap.set(buttons, { scale: .72, transformOrigin: "center center" });
        }

        const entrada = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        if (motionReduced) {
          entrada.to(buttons, {
            autoAlpha: 1,
            duration: .24,
            stagger: .08,
            ease: "power1.out",
          });
          return undefined;
        }

        entrada.to(buttons, {
          autoAlpha: 1,
          scale: 1,
          duration: .5,
          stagger: .16,
          ease: "back.out(1.32)",
          onComplete: () => gsap.set(buttons, { clearProps: "transform" }),
        });

        return undefined;
      },
      root
    );

    return () => media.revert();
  }, [seccionSeleccionada]);

  return (
    <ControladorDpad ref={controladorRef}>
      <svg viewBox="72 72 456 456" preserveAspectRatio="xMidYMid meet" role="group" aria-label={"Navegación principal del portafolio"}>
        <BotonRombo
          etiqueta="CONTACTO"
          ariaLabel="Ir a contacto"
          orden="1"
          transform="translate(300 194)"
          hoverY={-12}
          onClick={() => navegar("contacto")}
        />
        <BotonRombo
          etiqueta="MI HISTORIA"
          ariaLabel="Ir a mi historia"
          orden="2"
          transform="translate(406 300)"
          hoverX={12}
          onClick={() => navegar("timeline")}
        />
        <BotonRombo
          etiqueta="PROYECTOS"
          ariaLabel="Ir a proyectos"
          orden="3"
          transform="translate(300 406)"
          hoverY={12}
          onClick={() => navegar("proyectos")}
        />
        <BotonRombo
          etiqueta="TECNOLOGÍAS"
          ariaLabel="Ir a tecnologías"
          orden="4"
          transform="translate(194 300)"
          hoverX={-12}
          onClick={() => navegar("tecnologias")}
        />
      </svg>
    </ControladorDpad>
  );
};
