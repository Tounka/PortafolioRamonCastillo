import { useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { SiOpenai, SiAnthropic } from "react-icons/si";
import { BsTerminalFill } from "react-icons/bs";
import { GiWingedLeg, GiCrabClaw } from "react-icons/gi";
import { ContextoGeneral } from "../ContextoGeneral";
import MetaBalls from "../../../ComponentesGenerales/MetaBalls";
import "./TecnologiasDrift.css";
import html5 from "../../../Img/Tecnologias/logos/html5.svg";
import css3 from "../../../Img/Tecnologias/logos/css3.svg";
import javascript from "../../../Img/Tecnologias/logos/javascript.svg";
import react from "../../../Img/Tecnologias/logos/react.svg";
import wordpress from "../../../Img/Tecnologias/logos/wordpress.svg";
import shopify from "../../../Img/Tecnologias/logos/shopify.svg";
import woocommerce from "../../../Img/Tecnologias/logos/woocommerce.svg";
import styledcomponents from "../../../Img/Tecnologias/logos/styledcomponents.svg";
import nodejs from "../../../Img/Tecnologias/logos/nodejs.svg";
import nextjs from "../../../Img/Tecnologias/logos/nextjs.svg";
import python from "../../../Img/Tecnologias/logos/python.svg";
import postgresql from "../../../Img/Tecnologias/logos/postgresql.svg";
import firebase from "../../../Img/Tecnologias/logos/firebase.svg";
import supabase from "../../../Img/Tecnologias/logos/supabase.svg";
import github from "../../../Img/Tecnologias/logos/github.svg";
import googlecloud from "../../../Img/Tecnologias/logos/googlecloud.svg";
import stripe from "../../../Img/Tecnologias/logos/stripe.svg";

const AMARILLO = "#FCB71C";

// Cada categoría es una fila; las tecnologías sin logo SVG usan un icono de react-icons.
const categorias = [
  {
    id: "frontend",
    nombre: "Frontend",
    color: "#FCB71C",
    descripcion: "Interfaz, estilos y experiencias web.",
    tecnologias: [
      { title: "React", image: react, description: "Interfaces componibles construidas con componentes reutilizables." },
      { title: "Next.js", image: nextjs, description: "Aplicaciones React con rendimiento, rutas y renderizado híbrido." },
      { title: "JavaScript", image: javascript, description: "Lógica interactiva y comportamiento dinámico en el navegador." },
      { title: "HTML5", image: html5, description: "Estructura semántica y accesible para interfaces web." },
      { title: "CSS3", image: css3, description: "Estilos responsivos, layouts y microinteracciones visuales." },
      { title: "Styled Components", image: styledcomponents, description: "Estilos encapsulados y mantenibles directamente en React." }
    ]
  },
  {
    id: "backend",
    nombre: "Backend y datos",
    color: "#5EC8F2",
    descripcion: "Lógica, bases de datos y servicios.",
    tecnologias: [
      { title: "Node.js", image: nodejs, description: "Servicios backend y APIs rápidas con JavaScript." },
      { title: "Python", image: python, description: "Automatización, lógica de servidor y herramientas de datos." },
      { title: "PostgreSQL", image: postgresql, description: "Base de datos relacional robusta para información crítica." },
      { title: "Supabase", image: supabase, description: "Backend abierto con PostgreSQL, auth y tiempo real." },
      { title: "Firebase", image: firebase, description: "Autenticación, datos y servicios cloud para productos web." }
    ]
  },
  {
    id: "comercio",
    nombre: "CMS y e-commerce",
    color: "#C49BFF",
    descripcion: "Gestión de contenido y tiendas online.",
    tecnologias: [
      { title: "Stripe", image: stripe, description: "Pagos online seguros integrados al producto." },
      { title: "Shopify", image: shopify, description: "Tiendas online configuradas para vender con flexibilidad." },
      { title: "WooCommerce", image: woocommerce, description: "Comercio electrónico integrado dentro de WordPress." },
      { title: "WordPress", image: wordpress, description: "Sitios administrables y experiencias editoriales personalizadas." }
    ]
  },
  {
    id: "ia",
    nombre: "IA y agentes",
    color: "#FF8A6B",
    descripcion: "Modelos, asistentes y agentes de código.",
    tecnologias: [
      { title: "ChatGPT", Icono: SiOpenai, colorIcono: "#ffffff", description: "Modelos de OpenAI integrados en flujos y productos." },
      { title: "Anthropic", Icono: SiAnthropic, colorIcono: "#D97757", description: "Claude para asistentes, análisis y automatización." },
      { title: "OpenCode", Icono: BsTerminalFill, colorIcono: "#ffffff", description: "Agente de código open source en la terminal." },
      { title: "Hermes", Icono: GiWingedLeg, colorIcono: "#E8C46A", description: "Agente Hermes para tareas autónomas." },
      { title: "OpenClaw", Icono: GiCrabClaw, colorIcono: "#FF5A4E", description: "Asistente personal open source basado en agentes." }
    ]
  },
  {
    id: "cloud",
    nombre: "Cloud y flujo",
    color: "#6EE7A0",
    descripcion: "Infraestructura, despliegue y control de versiones.",
    tecnologias: [
      { title: "GitHub", image: github, description: "Control de versiones, colaboración y despliegues de código." },
      { title: "Google Cloud", image: googlecloud, description: "Infraestructura cloud escalable para aplicaciones y servicios." }
    ]
  }
];

// Lista plana para el carrusel: cada tecnología conoce su categoría.
const todasLasTecnologias = categorias.flatMap(({ tecnologias, ...categoria }) =>
  tecnologias.map(tecnologia => ({ ...tecnologia, categoria }))
);

const TOTAL = todasLasTecnologias.length;
const INTERVALO_CARRUSEL = 4800;

// Tres masas de metaballs que derivan por la sección; la deriva vive en el CSS.
const metaballsFlotantes = [
  { id: "norte", ballCount: 12, animationSize: 30 },
  { id: "sur", ballCount: 15, animationSize: 28 },
  { id: "este", ballCount: 9, animationSize: 34 }
];

const resorte = { type: "spring", stiffness: 260, damping: 26 };

// Entrada escalonada de la sección cada vez que se vuelve visible.
const varianteContenedor = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const varianteElemento = {
  oculto: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: resorte }
};

const varianteLogo = {
  oculto: { opacity: 0, y: 14, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: resorte }
};

// La tarjeta entra por un lado y sale por el otro según la dirección del cambio.
const varianteTarjeta = {
  entra: direccion => ({ x: direccion > 0 ? 90 : -90, rotate: direccion > 0 ? 5 : -5, opacity: 0, scale: 0.94 }),
  centro: { x: 0, rotate: 0, opacity: 1, scale: 1, transition: resorte },
  sale: direccion => ({
    x: direccion > 0 ? -90 : 90,
    rotate: direccion > 0 ? -5 : 5,
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] }
  })
};

const IconoTecnologia = ({ tecnologia }) => {
  const { image, Icono, colorIcono } = tecnologia;

  return Icono
    ? <Icono aria-hidden="true" style={{ color: colorIcono }} />
    : <img src={image} alt="" loading="lazy" />;
};

const LogoTecnologia = ({ tecnologia, seleccionada, onSeleccionar }) => (
  <motion.li variants={varianteLogo}>
    <button
      type="button"
      className={`tecnologias-drift__tech${seleccionada ? " is-seleccionada" : ""}`}
      aria-pressed={seleccionada}
      onClick={onSeleccionar}
    >
      <span className="tecnologias-drift__logo">
        <IconoTecnologia tecnologia={tecnologia} />
        {/* Un solo anillo compartido: framer-motion lo desliza de un logo al siguiente. */}
        {seleccionada && (
          <motion.span
            layoutId="tecnologias-anillo"
            className="tecnologias-drift__anillo"
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          />
        )}
      </span>
      <span className="tecnologias-drift__tech-nombre">{tecnologia.title}</span>
    </button>
  </motion.li>
);

const CarruselTecnologias = ({ indice, direccion, enMarcha, onCambiar, onPausar }) => {
  const tecnologia = todasLasTecnologias[indice];

  return (
    <motion.div
      variants={varianteElemento}
      className="tecnologias-drift__carrusel"
      style={{ "--color-categoria": tecnologia.categoria.color }}
      // Solo el mouse pausa: en táctil no hay "leave" y el carrusel quedaría detenido.
      onPointerEnter={e => e.pointerType === "mouse" && onPausar(true)}
      onPointerLeave={e => e.pointerType === "mouse" && onPausar(false)}
      aria-roledescription="carrusel"
      aria-label="Detalle de tecnologías"
    >
      <div className="tecnologias-drift__mazo">
        <AnimatePresence initial={false} custom={direccion} mode="popLayout">
          <motion.article
            key={tecnologia.title}
            className="tecnologias-drift__tarjeta"
            custom={direccion}
            variants={varianteTarjeta}
            initial="entra"
            animate="centro"
            exit="sale"
            aria-live="polite"
          >
            <div className="tecnologias-drift__tarjeta-cabecera">
              <motion.span
                className="tecnologias-drift__tarjeta-logo"
                initial={{ scale: 0.4, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.08 }}
              >
                <IconoTecnologia tecnologia={tecnologia} />
              </motion.span>
              <span className="tecnologias-drift__tarjeta-categoria">{tecnologia.categoria.nombre}</span>
            </div>

            <h3 className="tecnologias-drift__tarjeta-titulo">
              <motion.span
                className="tecnologias-drift__tarjeta-subrayado"
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              />
              <span className="tecnologias-drift__tarjeta-nombre">{tecnologia.title}</span>
            </h3>

            <motion.p
              className="tecnologias-drift__tarjeta-descripcion"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
            >
              {tecnologia.description}
            </motion.p>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="tecnologias-drift__barra">
        {/* El fin de esta animación es lo que avanza el carrusel: pausar la barra pausa el autoplay. */}
        <span
          key={indice}
          className="tecnologias-drift__progreso"
          style={{
            animationDuration: `${INTERVALO_CARRUSEL}ms`,
            animationPlayState: enMarcha ? "running" : "paused"
          }}
          onAnimationEnd={() => onCambiar(indice + 1, 1)}
        />
        <button type="button" onClick={() => onCambiar(indice - 1, -1)} aria-label="Tecnología anterior">
          <FaAngleLeft aria-hidden="true" />
        </button>
        <span className="tecnologias-drift__contador">
          {String(indice + 1).padStart(2, "0")} <span>/ {TOTAL}</span>
        </span>
        <button type="button" onClick={() => onCambiar(indice + 1, 1)} aria-label="Tecnología siguiente">
          <FaAngleRight aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
};

export const TecnologiasDrift = () => {
  const { irASeccion, seccionSeleccionada } = useContext(ContextoGeneral);
  const activa = seccionSeleccionada === "tecnologias";
  const [{ indice, direccion }, setCarrusel] = useState({ indice: 0, direccion: 1 });
  const [enPausa, setEnPausa] = useState(false);

  const regresar = () => irASeccion("main");

  const cambiar = useCallback((nuevoIndice, nuevaDireccion) => {
    setCarrusel({ indice: (nuevoIndice + TOTAL) % TOTAL, direccion: nuevaDireccion });
  }, []);

  const seleccionarDesdeGrid = titulo => {
    const destino = todasLasTecnologias.findIndex(t => t.title === titulo);
    if (destino !== indice) cambiar(destino, destino > indice ? 1 : -1);
  };

  const seleccionada = todasLasTecnologias[indice].title;
  const estado = activa ? "visible" : "oculto";

  return (
    <section className="tecnologias-drift">
      <div className="tecnologias-drift__metaballs" aria-hidden="true">
        {metaballsFlotantes.map(({ id, ballCount, animationSize }) => (
          <div key={id} className={`tecnologias-drift__metaball tecnologias-drift__metaball--${id}`}>
            <MetaBalls
              color={AMARILLO}
              cursorBallColor={AMARILLO}
              cursorBallSize={2}
              ballCount={ballCount}
              animationSize={animationSize}
              enableMouseInteraction={true}
              enableTransparency={true}
              hoverSmoothness={0.05}
              clumpFactor={1}
              speed={0.3}
              pausado={!activa}
            />
          </div>
        ))}
      </div>

      <motion.header
        className="tecnologias-drift__intro"
        variants={varianteContenedor}
        initial="oculto"
        animate={estado}
      >
        <motion.span
          className="tecnologias-drift__acento"
          aria-hidden="true"
          variants={{ oculto: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
        />
        <motion.h2 className="tecnologias-drift__titulo" variants={varianteElemento}>Tecnologías</motion.h2>
        <motion.p className="tecnologias-drift__subtitulo" variants={varianteElemento}>
          Las herramientas con las que construyo, de la interfaz a la nube.
        </motion.p>
        <CarruselTecnologias
          indice={indice}
          direccion={direccion}
          enMarcha={activa && !enPausa}
          onCambiar={cambiar}
          onPausar={setEnPausa}
        />
      </motion.header>

      <motion.div
        className="tecnologias-drift__categorias"
        variants={varianteContenedor}
        initial="oculto"
        animate={estado}
      >
        {categorias.map(categoria => (
          <motion.article
            key={categoria.id}
            className="tecnologias-drift__categoria"
            style={{ "--color-categoria": categoria.color }}
            variants={{ oculto: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          >
            <motion.div className="tecnologias-drift__categoria-info" variants={varianteElemento}>
              <h3 className="tecnologias-drift__categoria-nombre">
                <span className="tecnologias-drift__punto" aria-hidden="true" />
                {categoria.nombre}
              </h3>
              <p className="tecnologias-drift__categoria-descripcion">{categoria.descripcion}</p>
            </motion.div>

            <ul className="tecnologias-drift__techs">
              {categoria.tecnologias.map(tecnologia => (
                <LogoTecnologia
                  key={tecnologia.title}
                  tecnologia={tecnologia}
                  seleccionada={tecnologia.title === seleccionada}
                  onSeleccionar={() => seleccionarDesdeGrid(tecnologia.title)}
                />
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>

      <button className="tecnologias-drift__return" type="button" onClick={regresar} aria-label="Ir a la sección principal">
        <FaAngleRight aria-hidden="true" />
      </button>
    </section>
  );
};
