import { createContext, useCallback, useState } from "react";
import imgUniversidad from "../../Img/TimeLine/imgUniversidad.jpg";
import imgUniversidadWebp from "../../Img/TimeLine/imgUniversidad.webp";
import imgGerente from "../../Img/TimeLine/imgGerente.jpg";
import imgGerenteWebp from "../../Img/TimeLine/imgGerente.webp";
import imgPracticas from "../../Img/TimeLine/imgPracticas.png";
import imgPracticasWebp from "../../Img/TimeLine/imgPracticas.webp";
import imgSitioRandom from "../../Img/TimeLine/sitioRandom.jpg";
import imgSitioRandomWebp from "../../Img/TimeLine/sitioRandom.webp";
import imgFreelance from "../../Img/TimeLine/freelance.jpg";
import imgFreelanceWebp from "../../Img/TimeLine/freelance.webp";

const DATOS_LINEA_TIEMPO = [
  {
    titulo: "Universidad",
    fecha: "2021",
    descripcion: "En 2021 inicié la carrera de Ingeniería en Software en la UAdeO. Esta etapa ha sido fundamental para fortalecer mis conocimientos técnicos y crecer profesionalmente.",
    img: imgUniversidad,
    imgWebp: imgUniversidadWebp
  },
  {
    titulo: "Gerencia",
    fecha: "2023",
    descripcion: "En 2023 asumí el reto de ocupar un puesto gerencial. Esta experiencia me ayudó a crecer en liderazgo y gestión. En 2025 decidí cerrar ese ciclo profesional para enfocarme completamente en el área tecnológica.",
    img: imgGerente,
    imgWebp: imgGerenteWebp
  },
  {
    titulo: "iNNCi Lab",
    fecha: "2025",
    img: imgPracticas,
    imgWebp: imgPracticasWebp,
    descripcion: "(Enero 2025 / Actualidad)  Inicié mi colaboración con iNNCi Lab como prestador de servicios, participando en el desarrollo de soluciones web para clientes y colaboradores de la compañía. Disfruto enfrentar nuevos retos técnicos y apoyar a mis compañeros resolviendo dudas y optimizando procesos, lo que me ha permitido crecer profesionalmente y aportar mayor valor al equipo.",
  },
  {
    titulo: "Sitio Random",
    fecha: "2025",
    descripcion: "(Agosto 2025 / Agosto 2026) Me desempeño como desarrollador Full Stack en Sitio Random, donde diseño y desarrollo soluciones web escalables utilizando Next.js, contribuyendo a la creación de aplicaciones modernas, eficientes y orientadas al crecimiento del negocio.",
    img: imgSitioRandom,
    imgWebp: imgSitioRandomWebp
  },
  {
    titulo: "Freelance",
    fecha: "2026",
    descripcion: "(Actualidad) Desarrollo proyectos de forma independiente para negocios de distintos sectores: sitios de servicios y cursos como CIMA Coaching, catálogos de inventario como MTC MAQ, plataformas de reservas como Explore Mazatlán y sistemas internos como el ERP de Traalma.",
    img: imgFreelance,
    imgWebp: imgFreelanceWebp
  },
];

const ContextoGeneral = createContext();

const ContextoProviderGeneral = ({ children }) => {
  const [boolSlider, setBoolSlider] = useState(false);
  const [navegarASeccion, setNavegarASeccion] = useState(null);
  const registrarNavegacion = useCallback((navegacion) => {
    setNavegarASeccion(() => navegacion);
  }, []);

  const [seccionSeleccionada, setSeccionSeleccionada] = useState("main");

  // Usa la navegación espacial registrada; si aún no existe, hace scroll directo al elemento.
  const irASeccion = useCallback((seccion) => {
    if (navegarASeccion) {
      navegarASeccion(seccion);
    } else {
      const id = seccion === "contacto" ? "Contacto" : seccion;
      setSeccionSeleccionada(id);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }

    if (seccion === "timeline") setBoolSlider(true);
  }, [navegarASeccion]);

  const [posicionTimeline, setPosicionTimeline] = useState(1);
  return (
    <ContextoGeneral.Provider value={{ boolSlider, setBoolSlider, Datos: DATOS_LINEA_TIEMPO, posicionTimeline, setPosicionTimeline, seccionSeleccionada, setSeccionSeleccionada, registrarNavegacion, navegarASeccion, irASeccion }}>
      {children}
    </ContextoGeneral.Provider>
  );
};

export { ContextoProviderGeneral, ContextoGeneral };
