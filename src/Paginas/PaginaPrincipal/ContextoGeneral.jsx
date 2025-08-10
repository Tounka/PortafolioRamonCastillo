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
      descripcion: "En enero de 2025 inicié mi colaboración con iNNCi Lab, participando en el desarrollo de diversas soluciones web dirigidas tanto a clientes como a colaboradores de la compañía. Disfruto especialmente enfrentar nuevos retos técnicos y apoyar a mis compañeros resolviendo dudas y mejorando procesos, lo que me ha permitido crecer profesionalmente y aportar valor al equipo.",
      img: imgPracticas,
      imgWebp: imgPracticasWebp
    }
  ];


  const [posicionTimeline, setPosicionTimeline] = useState(1);
  return (
    <ContextoGeneral.Provider value={{ boolSlider, setBoolSlider, Datos, posicionTimeline, setPosicionTimeline }}>
      {children}
    </ContextoGeneral.Provider>
  );
};

export { ContextoProviderGeneral, ContextoGeneral };   