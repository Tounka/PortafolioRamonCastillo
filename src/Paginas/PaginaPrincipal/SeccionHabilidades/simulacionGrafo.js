// Simulación de fuerzas mínima para el grafo de tecnologías (estilo Obsidian).
// Coordenadas de mundo centradas en (0, 0); el componente las traslada al lienzo.

const REPULSION = 2600;
const AMORTIGUACION = 0.84;
const VELOCIDAD_MAX = 14;

export const crearNodos = (tecnologias, islas, escala) => {
  const nodos = [];

  islas.forEach((isla, indiceIsla) => {
    nodos.push({
      id: "isla-" + isla.id,
      tipo: "isla",
      isla: isla.id,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      fijo: false,
      semilla: indiceIsla
    });
  });

  tecnologias.forEach((tecnologia, indice) => {
    const angulo = indice * 2.39996;
    nodos.push({
      id: tecnologia.title,
      tipo: "tecnologia",
      isla: tecnologia.isla,
      // Arranque en espiral alrededor del centro: se separan al primer segundo.
      x: Math.cos(angulo) * 40 * escala,
      y: Math.sin(angulo) * 40 * escala,
      vx: 0,
      vy: 0,
      fijo: false,
      semilla: indice + islas.length
    });
  });

  return nodos;
};

export const posicionarEnAnclas = (nodos, anclas) => {
  nodos.forEach((nodo, indice) => {
    const ancla = anclas[nodo.isla];
    const angulo = indice * 2.39996;
    const radio = nodo.tipo === "isla" ? 0 : 50;
    nodo.x = ancla.x + Math.cos(angulo) * radio;
    nodo.y = ancla.y + Math.sin(angulo) * radio;
  });
};

export const calcularAnclas = (islas, ancho, alto, tiempo) => {
  const anclas = {};
  // En pantallas verticales las islas se apilan para aprovechar el alto.
  const vertical = alto > ancho * 1.2;
  islas.forEach((isla, indice) => {
    const [fx, fy] = vertical && isla.anclaVertical ? isla.anclaVertical : isla.ancla;
    // Las islas "respiran" un poco para que el grafo nunca quede inmóvil.
    const deriva = Math.sin(tiempo * 0.00035 + indice * 1.7) * 10;
    anclas[isla.id] = {
      x: fx * ancho + deriva,
      y: fy * alto + Math.cos(tiempo * 0.0003 + indice) * 8
    };
  });
  return anclas;
};

export const pasoSimulacion = ({ nodos, enlaces, anclas, limites, radioNodo, escala }) => {
  const total = nodos.length;
  const repulsion = REPULSION * escala * escala;

  for (let i = 0; i < total; i += 1) {
    const a = nodos[i];
    for (let j = i + 1; j < total; j += 1) {
      const b = nodos[j];
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      let d2 = dx * dx + dy * dy;
      if (d2 < 0.01) {
        dx = (Math.random() - 0.5) * 0.1;
        dy = (Math.random() - 0.5) * 0.1;
        d2 = dx * dx + dy * dy;
      }
      const d = Math.sqrt(d2);
      // Islas distintas se repelen más para mantener el archipiélago separado.
      const factor = a.isla === b.isla ? 1 : 1.6;
      let fuerza = (repulsion * factor) / Math.max(d2, 400);

      const minimo = radioNodo * 2.9;
      if (d < minimo) fuerza += (minimo - d) * 0.22;

      const fx = (dx / d) * fuerza;
      const fy = (dy / d) * fuerza;
      a.vx -= fx;
      a.vy -= fy;
      b.vx += fx;
      b.vy += fy;
    }
  }

  enlaces.forEach(enlace => {
    const a = enlace.a;
    const b = enlace.b;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const d = Math.sqrt(dx * dx + dy * dy) || 1;
    const fuerza = (d - enlace.largo * escala) * enlace.rigidez;
    const fx = (dx / d) * fuerza;
    const fy = (dy / d) * fuerza;
    a.vx += fx;
    a.vy += fy;
    b.vx -= fx;
    b.vy -= fy;
  });

  nodos.forEach(nodo => {
    const ancla = anclas[nodo.isla];
    const atraccion = nodo.tipo === "isla" ? 0.05 : 0.008;
    nodo.vx += (ancla.x - nodo.x) * atraccion;
    nodo.vy += (ancla.y - nodo.y) * atraccion;

    if (nodo.fijo) {
      nodo.vx = 0;
      nodo.vy = 0;
      return;
    }

    nodo.vx *= AMORTIGUACION;
    nodo.vy *= AMORTIGUACION;
    const rapidez = Math.hypot(nodo.vx, nodo.vy);
    if (rapidez > VELOCIDAD_MAX) {
      nodo.vx = (nodo.vx / rapidez) * VELOCIDAD_MAX;
      nodo.vy = (nodo.vy / rapidez) * VELOCIDAD_MAX;
    }

    nodo.x = Math.min(limites.maxX, Math.max(limites.minX, nodo.x + nodo.vx));
    nodo.y = Math.min(limites.maxY, Math.max(limites.minY, nodo.y + nodo.vy));
  });
};
