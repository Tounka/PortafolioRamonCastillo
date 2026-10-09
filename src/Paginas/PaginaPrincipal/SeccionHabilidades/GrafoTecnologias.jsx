import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { calcularAnclas, crearNodos, pasoSimulacion, posicionarEnAnclas } from "./simulacionGrafo";
import "./GrafoTecnologias.css";

const UMBRAL_ARRASTRE = 5;

const crearEnlaces = (nodosPorId, tecnologias, conexiones, puentes) => {
  const enlaces = [];

  tecnologias.forEach(tecnologia => {
    enlaces.push({
      a: nodosPorId[tecnologia.title],
      b: nodosPorId["isla-" + tecnologia.isla],
      tipo: "isla",
      largo: 88,
      rigidez: 0.035
    });
  });

  conexiones.forEach(([origen, destino]) => {
    enlaces.push({ a: nodosPorId[origen], b: nodosPorId[destino], tipo: "interno", largo: 96, rigidez: 0.025 });
  });

  puentes.forEach(([origen, destino]) => {
    enlaces.push({ a: nodosPorId[origen], b: nodosPorId[destino], tipo: "puente", largo: 280, rigidez: 0.004 });
  });

  return enlaces;
};

const GrafoTecnologias = ({ tecnologias, islas, conexiones, puentes }) => {
  const contenedorRef = useRef(null);
  const nodoRefs = useRef({});
  const enlaceRefs = useRef([]);
  const haloRefs = useRef({});
  const tamanoRef = useRef({ ancho: 0, alto: 0 });
  const arrastreRef = useRef(null);
  const [esMovil, setEsMovil] = useState(false);
  const [hoverId, setHoverId] = useState(null);
  const [seleccionId, setSeleccionId] = useState(null);

  const radioNodo = esMovil ? 22 : 30;

  const islasPorId = useMemo(
    () => Object.fromEntries(islas.map(isla => [isla.id, isla])),
    [islas]
  );

  const grafo = useMemo(() => {
    const nodos = crearNodos(tecnologias, islas, 1);
    const nodosPorId = Object.fromEntries(nodos.map(nodo => [nodo.id, nodo]));
    const enlaces = crearEnlaces(nodosPorId, tecnologias, conexiones, puentes);
    return { nodos, nodosPorId, enlaces, posicionado: false };
  }, [tecnologias, islas, conexiones, puentes]);

  const vecinos = useMemo(() => {
    const mapa = {};
    grafo.nodos.forEach(nodo => { mapa[nodo.id] = new Set([nodo.id]); });
    grafo.enlaces.forEach(({ a, b }) => {
      mapa[a.id].add(b.id);
      mapa[b.id].add(a.id);
    });
    return mapa;
  }, [grafo]);

  useLayoutEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return undefined;

    const actualizar = ({ width, height }) => {
      tamanoRef.current = { ancho: width, alto: height };
      setEsMovil(width < 640);
    };

    actualizar(contenedor.getBoundingClientRect());
    const observador = new ResizeObserver(([entrada]) => actualizar(entrada.contentRect));
    observador.observe(contenedor);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    let raf = null;

    const animar = tiempo => {
      const { ancho, alto } = tamanoRef.current;

      if (ancho > 0 && alto > 0) {
        const escala = Math.min(1.25, Math.max(0.7, Math.min(ancho, alto * 1.3) / 900));
        const anclas = calcularAnclas(islas, ancho, alto, tiempo);

        if (!grafo.posicionado) {
          posicionarEnAnclas(grafo.nodos, anclas);
          grafo.posicionado = true;
        }

        const margen = radioNodo + 10;
        pasoSimulacion({
          nodos: grafo.nodos,
          enlaces: grafo.enlaces,
          anclas,
          radioNodo,
          escala,
          limites: {
            minX: -ancho / 2 + margen,
            maxX: ancho / 2 - margen,
            minY: -alto / 2 + margen,
            maxY: alto / 2 - margen - 18
          }
        });

        const cx = ancho / 2;
        const cy = alto / 2;

        grafo.nodos.forEach(nodo => {
          const elemento = nodoRefs.current[nodo.id];
          if (elemento) elemento.style.transform = `translate3d(${nodo.x + cx}px, ${nodo.y + cy}px, 0)`;
        });

        grafo.enlaces.forEach((enlace, indice) => {
          const linea = enlaceRefs.current[indice];
          if (!linea) return;
          linea.setAttribute("x1", enlace.a.x + cx);
          linea.setAttribute("y1", enlace.a.y + cy);
          linea.setAttribute("x2", enlace.b.x + cx);
          linea.setAttribute("y2", enlace.b.y + cy);
        });

        islas.forEach(isla => {
          const halo = haloRefs.current[isla.id];
          const centro = grafo.nodosPorId["isla-" + isla.id];
          if (halo && centro) halo.style.transform = `translate3d(${centro.x + cx}px, ${centro.y + cy}px, 0)`;
        });
      }

      raf = requestAnimationFrame(animar);
    };

    raf = requestAnimationFrame(animar);
    return () => cancelAnimationFrame(raf);
  }, [grafo, islas, radioNodo]);

  const aCoordenadasMundo = evento => {
    const rect = contenedorRef.current.getBoundingClientRect();
    return {
      x: evento.clientX - rect.left - rect.width / 2,
      y: evento.clientY - rect.top - rect.height / 2
    };
  };

  const iniciarArrastre = (evento, nodo) => {
    evento.stopPropagation();
    evento.currentTarget.setPointerCapture(evento.pointerId);
    const punto = aCoordenadasMundo(evento);
    arrastreRef.current = {
      id: nodo.id,
      inicioX: evento.clientX,
      inicioY: evento.clientY,
      desfaseX: nodo.x - punto.x,
      desfaseY: nodo.y - punto.y,
      movido: false
    };
  };

  const moverArrastre = (evento, nodo) => {
    const arrastre = arrastreRef.current;
    if (!arrastre || arrastre.id !== nodo.id) return;

    const distancia = Math.hypot(evento.clientX - arrastre.inicioX, evento.clientY - arrastre.inicioY);
    if (!arrastre.movido && distancia < UMBRAL_ARRASTRE) return;

    arrastre.movido = true;
    nodo.fijo = true;
    const punto = aCoordenadasMundo(evento);
    nodo.x = punto.x + arrastre.desfaseX;
    nodo.y = punto.y + arrastre.desfaseY;
  };

  const terminarArrastre = (evento, nodo) => {
    const arrastre = arrastreRef.current;
    if (!arrastre || arrastre.id !== nodo.id) return;

    nodo.fijo = false;
    arrastreRef.current = null;
    if (!arrastre.movido) setSeleccionId(actual => (actual === nodo.id ? null : nodo.id));
  };

  const activoId = hoverId ?? seleccionId;
  const vecinosActivos = activoId ? vecinos[activoId] : null;
  const tecnologiaActiva = tecnologias.find(tecnologia => tecnologia.title === activoId);
  const islaActiva = activoId
    ? islasPorId[grafo.nodosPorId[activoId]?.isla]
    : null;

  return (
    <div
      ref={contenedorRef}
      className={"grafo-tecnologias" + (activoId ? " grafo-tecnologias--enfocado" : "")}
      style={{ "--gt-radio": radioNodo + "px" }}
      onPointerDown={() => setSeleccionId(null)}
      role="group"
      aria-label="Grafo de tecnologías agrupadas por área"
    >
      {islas.map(isla => (
        <span
          key={"halo-" + isla.id}
          ref={elemento => { haloRefs.current[isla.id] = elemento; }}
          className="grafo-tecnologias__halo"
          style={{ "--gt-color": isla.color }}
          aria-hidden="true"
        />
      ))}

      <svg className="grafo-tecnologias__enlaces" aria-hidden="true">
        {grafo.enlaces.map((enlace, indice) => {
          const encendido = activoId && (enlace.a.id === activoId || enlace.b.id === activoId);
          const color = islasPorId[enlace.a.isla]?.color;
          return (
            <line
              key={enlace.a.id + "-" + enlace.b.id}
              ref={elemento => { enlaceRefs.current[indice] = elemento; }}
              className={
                "grafo-tecnologias__enlace grafo-tecnologias__enlace--" + enlace.tipo +
                (encendido ? " is-encendido" : "")
              }
              style={{ "--gt-color": color }}
            />
          );
        })}
      </svg>

      {grafo.nodos.map(nodo => {
        const isla = islasPorId[nodo.isla];
        const tecnologia = nodo.tipo === "tecnologia"
          ? tecnologias.find(item => item.title === nodo.id)
          : null;
        const atenuado = vecinosActivos && !vecinosActivos.has(nodo.id);
        const clases = [
          "grafo-tecnologias__nodo",
          "grafo-tecnologias__nodo--" + nodo.tipo,
          activoId === nodo.id ? "is-activo" : "",
          atenuado ? "is-atenuado" : ""
        ].filter(Boolean).join(" ");

        return (
          <div
            key={nodo.id}
            ref={elemento => { nodoRefs.current[nodo.id] = elemento; }}
            className={clases}
            style={{ "--gt-color": isla.color }}
            role="img"
            aria-label={tecnologia ? tecnologia.title + ": " + tecnologia.description : "Área: " + isla.nombre}
            onPointerEnter={evento => { if (evento.pointerType === "mouse") setHoverId(nodo.id); }}
            onPointerLeave={evento => { if (evento.pointerType === "mouse") setHoverId(null); }}
            onPointerDown={evento => iniciarArrastre(evento, nodo)}
            onPointerMove={evento => moverArrastre(evento, nodo)}
            onPointerUp={evento => terminarArrastre(evento, nodo)}
            onPointerCancel={evento => terminarArrastre(evento, nodo)}
          >
            {tecnologia ? (
              <>
                <span className="grafo-tecnologias__burbuja">
                  <img src={tecnologia.image} alt="" draggable={false} loading="eager" decoding="async" />
                </span>
                <span className="grafo-tecnologias__etiqueta">{tecnologia.title}</span>
              </>
            ) : (
              <>
                <span className="grafo-tecnologias__punto" />
                <span className="grafo-tecnologias__etiqueta">{isla.nombre}</span>
              </>
            )}
          </div>
        );
      })}

      <div className={"grafo-tecnologias__ficha" + (activoId ? " is-visible" : "")} aria-live="polite">
        {tecnologiaActiva ? (
          <>
            <span className="grafo-tecnologias__ficha-isla" style={{ color: islaActiva?.color }}>{islaActiva?.nombre}</span>
            <strong>{tecnologiaActiva.title}</strong>
            <p>{tecnologiaActiva.description}</p>
          </>
        ) : islaActiva ? (
          <>
            <span className="grafo-tecnologias__ficha-isla" style={{ color: islaActiva.color }}>Isla</span>
            <strong>{islaActiva.nombre}</strong>
            <p>{islaActiva.descripcion}</p>
          </>
        ) : (
          <p className="grafo-tecnologias__pista">Arrastra los nodos o pasa el cursor sobre una tecnología.</p>
        )}
      </div>
    </div>
  );
};

export default GrafoTecnologias;
