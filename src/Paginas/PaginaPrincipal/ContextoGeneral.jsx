import React, { createContext, useState } from 'react';
import imgGatito from "../../Img/TimeLine/Gatito.jpg";
import imgGatitoWebp from "../../Img/TimeLine/Gatito.webp";
import imgUniversidad from "../../Img/TimeLine/imgUniversidad.jpg";
import imgUniversidadWebp from "../../Img/TimeLine/imgUniversidad.webp";
import imgMcondalds from "../../Img/TimeLine/imgMcDonalds.jpeg";
import imgMcondaldsWebp from "../../Img/TimeLine/imgMcDonalds.webp";
import imgGerente from "../../Img/TimeLine/imgGerente.jpg";
import imgGerenteWebp from "../../Img/TimeLine/imgGerente.webp";
import imgPracticas from "../../Img/TimeLine/imgPracticas.png";
import imgPracticasWebp from "../../Img/TimeLine/imgPracticas.webp";
import imgSitioRandom from  "../../Img/TimeLine/sitioRandom.jpg";
import imgSitioRandomWebp from  "../../Img/TimeLine/sitioRandom.webp";

const ContextoGeneral = createContext();

const ContextoProviderGeneral = ({ children }) => {

  const [boolSlider, setBoolSlider] = useState(false);
  const Datos = [
    {
      titulo: "Nacimiento",
      fecha: "07/07/2003",
      descripcion: "Nací el 7 de julio de 2003 en Mazatlán, Sinaloa, y actualmente radico en Guadalajara, Jalisco. Durante la preparatoria descubrí mi interés por la programación, lo que marcó el inicio de mi camino en el desarrollo de software.",
      img: imgGatito,
      imgWebp: imgGatitoWebp
    },
    {
      titulo: "UAdeO",
      fecha: "2021",
      descripcion: "En 2021 inicié la carrera de Ingeniería en Software en la UAdeO. Esta etapa ha sido fundamental para fortalecer mis conocimientos técnicos y crecer profesionalmente.",
      img: imgUniversidad,
      imgWebp: imgUniversidadWebp
    },
    {
      titulo: "McDonald's",
      fecha: "2022",
      descripcion: "Durante las vacaciones del tercer semestre, busqué adquirir experiencia laboral y comencé a trabajar en McDonald's. Gracias a mi desempeño, fui promovido a entrenador, lo que me permitió combinar trabajo y estudios, desarrollando habilidades de responsabilidad y trabajo en equipo.",
      img: imgMcondalds,
      imgWebp: imgMcondaldsWebp
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
      descripcion:"(Agosto 2025 / Actualidad) Me desempeño como desarrollador Full Stack en Sitio Random, donde diseño y desarrollo soluciones web escalables utilizando Next.js, contribuyendo a la creación de aplicaciones modernas, eficientes y orientadas al crecimiento del negocio.",
      img: imgSitioRandom,
      imgWebp: imgSitioRandomWebp
    },
  ];


  const [posicionTimeline, setPosicionTimeline] = useState(1);
  return (
    <ContextoGeneral.Provider value={{ boolSlider, setBoolSlider, Datos, posicionTimeline, setPosicionTimeline }}>
      {children}
    </ContextoGeneral.Provider>
  );
};

export { ContextoProviderGeneral, ContextoGeneral };   