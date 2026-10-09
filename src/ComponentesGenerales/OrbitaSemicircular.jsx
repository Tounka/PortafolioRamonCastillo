import { useEffect, useRef, useState } from "react";
import "./OrbitaSemicircular.css";

// Proporciones de cada anillo respecto al ancho del semicírculo.
const RADIOS_ANILLO = [0.22, 0.36, 0.5];

// Mide el contenedor (no la ventana) para que la órbita respete el espacio real disponible.
const useTamanoContenedor = (ref) => {
  const [tamano, setTamano] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return undefined;

    const observador = new ResizeObserver(([entrada]) => {
      const { width, height } = entrada.contentRect;
      setTamano({ width, height });
    });
    observador.observe(nodo);
    return () => observador.disconnect();
  }, [ref]);

  return tamano;
};

const AnilloOrbita = ({ items, radio, centroX, centroY, tamanoIcono, indiceAnillo, colores }) => {
  const total = items.length;

  return items.map((item, index) => {
    // Con un solo elemento lo colocamos en la cima del arco.
    const angulo = total > 1 ? (index / (total - 1)) * 180 : 90;
    const rad = (angulo * Math.PI) / 180;
    const x = radio * Math.cos(rad);
    const y = radio * Math.sin(rad);

    // Los iconos altos abren el tooltip hacia dentro del arco; los cercanos a la base, hacia arriba.
    // En los extremos se alinea hacia dentro para no salirse del contenedor.
    const tooltipArriba = y < radio * 0.5;
    const alineacion = angulo < 35 ? "derecha" : angulo > 145 ? "izquierda" : "centro";
    const color = colores[item.isla] || "var(--AmarilloEspecial)";

    return (
      <div
        key={item.title}
        className="orbita-semicircular__nodo"
        style={{
          left: `${centroX + x - tamanoIcono / 2}px`,
          top: `${centroY - y - tamanoIcono / 2}px`,
          width: tamanoIcono,
          height: tamanoIcono,
          "--os-color": color,
          "--os-retraso": `${indiceAnillo * 120 + index * 45}ms`
        }}
      >
        <button type="button" className="orbita-semicircular__burbuja" aria-label={item.title}>
          <img src={item.image} alt="" draggable={false} />
        </button>

        <div
          role="tooltip"
          className={[
            "orbita-semicircular__tooltip",
            tooltipArriba ? "orbita-semicircular__tooltip--arriba" : "orbita-semicircular__tooltip--abajo",
            `orbita-semicircular__tooltip--${alineacion}`
          ].join(" ")}
        >
          <strong>{item.title}</strong>
          {item.description && <span>{item.description}</span>}
        </div>
      </div>
    );
  });
};

/**
 * Semicírculo con varios anillos de iconos en órbita.
 *
 * @param {Array<Array<{title, image, description?, isla?}>>} anillos  Elementos de cada anillo, de dentro hacia fuera (máx. 3).
 * @param {Object} colores  Mapa isla -> color para el acento de cada burbuja.
 */
const OrbitaSemicircular = ({ titulo, subtitulo, anillos, colores = {}, leyenda }) => {
  const escenarioRef = useRef(null);
  const { width, height } = useTamanoContenedor(escenarioRef);

  // El semicírculo ocupa ancho x (ancho * 0.6): limitamos por ancho y por alto disponibles.
  const anchoBase = Math.max(0, Math.min(width * 0.94, height / 0.62, 820));
  const centroX = anchoBase / 2;
  const centroY = anchoBase * 0.5;
  const tamanoIcono = Math.round(
    width < 480 ? Math.max(30, anchoBase * 0.075) : Math.max(36, anchoBase * 0.07)
  );

  return (
    <section className="orbita-semicircular">
      <header className="orbita-semicircular__encabezado">
        <h2>{titulo}</h2>
        {subtitulo && <p>{subtitulo}</p>}
      </header>

      <div className="orbita-semicircular__escenario" ref={escenarioRef}>
        {anchoBase > 0 && (
          <div className="orbita-semicircular__arco" style={{ width: anchoBase, height: anchoBase * 0.6 }}>
            <div className="orbita-semicircular__resplandor" aria-hidden="true" />

            {anillos.slice(0, RADIOS_ANILLO.length).map((_, i) => {
              const diametro = anchoBase * RADIOS_ANILLO[i] * 2;
              return (
                <span
                  key={`guia-${i}`}
                  className="orbita-semicircular__guia"
                  aria-hidden="true"
                  style={{
                    width: diametro,
                    height: diametro / 2,
                    left: centroX - diametro / 2,
                    top: centroY - diametro / 2
                  }}
                />
              );
            })}

            {anillos.slice(0, RADIOS_ANILLO.length).map((items, i) => (
              <AnilloOrbita
                key={`anillo-${i}`}
                items={items}
                radio={anchoBase * RADIOS_ANILLO[i]}
                centroX={centroX}
                centroY={centroY}
                tamanoIcono={tamanoIcono}
                indiceAnillo={i}
                colores={colores}
              />
            ))}
          </div>
        )}
      </div>

      {leyenda && (
        <ul className="orbita-semicircular__leyenda">
          {leyenda.map(({ id, nombre, color }) => (
            <li key={id} style={{ "--os-color": color }}>{nombre}</li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default OrbitaSemicircular;
