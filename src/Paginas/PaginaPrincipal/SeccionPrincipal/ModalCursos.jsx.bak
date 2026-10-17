import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { CURSO_FIREBASE } from "./DataCursos";

const CLAVE_PROGRESO = "cursos:firebase:vistas";

const aSegundos = (duracion) =>
  duracion.split(":").reduce((total, parte) => total * 60 + Number(parte), 0);

const formatearTotal = (segundos) => {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.round((segundos % 3600) / 60);
  return horas ? `${horas} h ${minutos} min` : `${minutos} min`;
};

const leerProgreso = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(CLAVE_PROGRESO)) || []);
  } catch {
    return new Set();
  }
};

const guardarProgreso = (vistas) => {
  try {
    localStorage.setItem(CLAVE_PROGRESO, JSON.stringify([...vistas]));
  } catch {
    /* sin almacenamiento disponible: el progreso solo vive en memoria */
  }
};

const Fondo = styled.div`
  --yellow: #fcb71c;
  --white: #f2f0eb;
  --muted: #8d8b86;
  --line: #24252a;
  --panel: #111214;

  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(0px, 3vw, 40px);
  background: rgba(0, 0, 0, .85);
  font-family: "Baloo 2", sans-serif;
  color: var(--white);
`;

const Ventana = styled.div`
  width: min(1280px, 100%);
  height: min(840px, 100%);
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 680px) {
    border: none;
    border-radius: 0;
  }
`;

const Encabezado = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--line);

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.2;
  }

  p {
    margin: 2px 0 0;
    color: var(--muted);
    font-size: 14px;
  }

  @media (max-width: 680px) {
    padding: 12px 16px;
  }
`;

const BotonTexto = styled.button`
  flex: none;
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: transparent;
  color: var(--white);
  font: 600 14px "Baloo 2", sans-serif;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: var(--muted);
  }

  &:disabled {
    opacity: .35;
    cursor: default;
  }

  &:focus-visible {
    outline: 2px solid var(--yellow);
    outline-offset: 2px;
  }
`;

const BotonSiguiente = styled(BotonTexto)`
  border-color: var(--yellow);
  background: var(--yellow);
  color: #111;

  &:hover:not(:disabled) {
    border-color: #e5a50f;
    background: #e5a50f;
  }
`;

const Cuerpo = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  min-height: 0;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, 1fr);
  }
`;

const ZonaReproductor = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  padding: 24px;
  overflow-y: auto;

  video {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    max-height: calc(100% - 110px);
    background: #000;
    border-radius: 4px;
  }

  @media (max-width: 960px) {
    overflow: visible;
    padding: 0 0 16px;

    video {
      border-radius: 0;
      max-height: none;
    }
  }
`;

const InfoClase = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;

  span {
    color: var(--muted);
    font-size: 13px;
  }

  h3 {
    margin: 0 0 4px;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.25;
  }

  p {
    margin: 0;
    max-width: 62ch;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.5;
  }

  @media (max-width: 960px) {
    padding: 0 16px;
  }

  @media (max-width: 560px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const Controles = styled.div`
  flex: none;
  display: flex;
  gap: 8px;
`;

const Temario = styled.aside`
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-left: 1px solid var(--line);

  @media (max-width: 960px) {
    border-left: none;
    border-top: 1px solid var(--line);
  }
`;

const CabeceraTemario = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 16px 20px 12px;
  border-bottom: 1px solid var(--line);

  h4 {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
  }

  span {
    color: var(--muted);
    font-size: 13px;
  }
`;

const ListaClases = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--line) transparent;
`;

const ItemClase = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  padding: 10px 20px 10px 17px;
  border: none;
  border-left: 3px solid ${(p) => (p.$activa ? "var(--yellow)" : "transparent")};
  border-bottom: 1px solid var(--line);
  background: ${(p) => (p.$activa ? "#1a1b1e" : "transparent")};
  color: inherit;
  text-align: left;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    background: #1a1b1e;
  }

  &:focus-visible {
    outline: 2px solid var(--yellow);
    outline-offset: -2px;
  }

  img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 3px;
    background: #1a1b1e;
  }

  small {
    display: block;
    color: var(--muted);
    font-size: 12px;
  }

  strong {
    display: block;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.3;
    color: ${(p) => (p.$activa ? "var(--yellow)" : "var(--white)")};
  }
`;

const totalSegundos = CURSO_FIREBASE.clases.reduce(
  (total, clase) => total + aSegundos(clase.duracion),
  0,
);

export const ModalCursos = ({ abierto, alCerrar }) => {
  const { clases } = CURSO_FIREBASE;
  const [indice, setIndice] = useState(0);
  const [vistas, setVistas] = useState(leerProgreso);
  const [autoReproducir, setAutoReproducir] = useState(false);
  const botonCerrarRef = useRef(null);
  const videoRef = useRef(null);
  const clase = clases[indice];

  const marcarVista = useCallback((i) => {
    setVistas((previas) => {
      if (previas.has(i)) return previas;
      const nuevas = new Set(previas).add(i);
      guardarProgreso(nuevas);
      return nuevas;
    });
  }, []);

  const cambiarClase = (i) => {
    if (i < 0 || i >= clases.length) return;
    setAutoReproducir(true);
    setIndice(i);
  };

  useEffect(() => {
    if (!abierto) return undefined;

    const focoPrevio = document.activeElement;
    botonCerrarRef.current?.focus();

    const alPresionar = (evento) => {
      if (evento.key === "Escape") alCerrar();
    };
    window.addEventListener("keydown", alPresionar);

    return () => {
      window.removeEventListener("keydown", alPresionar);
      videoRef.current?.pause();
      focoPrevio?.focus?.({ preventScroll: true });
    };
  }, [abierto, alCerrar]);

  if (!abierto) return null;

  return createPortal(
    <Fondo
      onMouseDown={(evento) => evento.target === evento.currentTarget && alCerrar()}
      // Evita que las flechas lleguen a la navegación espacial del portafolio.
      onKeyDown={(evento) => evento.stopPropagation()}
    >
      <Ventana role="dialog" aria-modal="true" aria-labelledby="titulo-curso">
        <Encabezado>
          <div>
            <h2 id="titulo-curso">Curso: {CURSO_FIREBASE.titulo}</h2>
            <p>
              {clases.length} clases · {formatearTotal(totalSegundos)} · {CURSO_FIREBASE.nivel}
            </p>
          </div>
          <BotonTexto ref={botonCerrarRef} onClick={alCerrar}>
            Cerrar
          </BotonTexto>
        </Encabezado>

        <Cuerpo>
          <ZonaReproductor>
            <video
              key={clase.src}
              ref={videoRef}
              src={clase.src}
              poster={clase.poster}
              controls
              autoPlay={autoReproducir}
              preload="metadata"
              playsInline
              onEnded={() => {
                marcarVista(indice);
                cambiarClase(indice + 1);
              }}
              onTimeUpdate={(evento) => {
                const { currentTime, duration } = evento.currentTarget;
                if (duration && currentTime / duration > 0.9) marcarVista(indice);
              }}
            />

            <InfoClase>
              <div>
                <span>
                  Clase {indice + 1} de {clases.length} · {clase.duracion}
                </span>
                <h3>{clase.titulo}</h3>
                <p>{clase.descripcion}</p>
              </div>
              <Controles>
                <BotonTexto onClick={() => cambiarClase(indice - 1)} disabled={indice === 0}>
                  Anterior
                </BotonTexto>
                <BotonSiguiente
                  onClick={() => cambiarClase(indice + 1)}
                  disabled={indice === clases.length - 1}
                >
                  Siguiente
                </BotonSiguiente>
              </Controles>
            </InfoClase>
          </ZonaReproductor>

          <Temario aria-label="Temario del curso">
            <CabeceraTemario>
              <h4>Contenido</h4>
              <span>
                {vistas.size} de {clases.length} vistas
              </span>
            </CabeceraTemario>

            <ListaClases>
              {clases.map((item, i) => (
                <li key={item.src}>
                  <ItemClase
                    $activa={i === indice}
                    onClick={() => cambiarClase(i)}
                    aria-current={i === indice ? "true" : undefined}
                  >
                    <img src={item.poster} alt="" loading="lazy" />
                    <span>
                      <small>
                        {String(i + 1).padStart(2, "0")} · {item.duracion}
                        {vistas.has(i) && " · Vista"}
                      </small>
                      <strong>{item.titulo}</strong>
                    </span>
                  </ItemClase>
                </li>
              ))}
            </ListaClases>
          </Temario>
        </Cuerpo>
      </Ventana>
    </Fondo>,
    document.body,
  );
};
