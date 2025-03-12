import React, { createContext, useState } from 'react';
import imgGatito from "../../Img/TimeLine/Gatito.jpg";
import imgGatitoWebp from "../../Img/TimeLine/Gatito.webp";
import imgPreparatoria from "../../Img/TimeLine/imgPreparatoria.png";
import imgPreparatoriaWebp from "../../Img/TimeLine/imgPreparatoria.webp";
import imgSecundaria from "../../Img/TimeLine/imgSecundaria.png";
import imgSecundariaWebp from "../../Img/TimeLine/imgSecundaria.webp";
import imgUniversidad from "../../Img/TimeLine/imgUniversidad.jpg";
import imgUniversidadWebp from "../../Img/TimeLine/imgUniversidad.webp";
import imgMcondalds from "../../Img/TimeLine/imgMcDonalds.jpg";
import imgMcondaldsWebp from "../../Img/TimeLine/imgMcDonalds.webp";
import imgSabatino from "../../Img/TimeLine/imgSabatino.jpg";
import imgSabatinoWebp from "../../Img/TimeLine/imgSabatino.webp";
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
      descripcion: "Nací el 7 de julio de 2003 en Mazatlán, Sinaloa.",
      img: imgGatito,
      imgWebp: imgGatitoWebp
    },
    {
      titulo: "Secundaria",
      fecha: "2014",
      descripcion: "Tras graduarme del colegio Begsu, ingresé a la Multiversidad Latinoamericana. Fue una etapa donde no solo aprendí, sino que también construí amistades que valoro hasta el día de hoy.",
      img: imgSecundaria,
      imgWebp: imgSecundariaWebp
    },
    {
      titulo: "Preparatoria",
      fecha: "2017",
      descripcion: "Estudié la preparatoria en José Vasconcelos, eligiendo Informática como optativa y Físico-Matemático como área disciplinar. Aquí fue donde mi interés por la informática se transformó en una pasión por la programación. Aunque no adquirí habilidades avanzadas en ese momento, me impulsó a desarrollar mis habilidades de forma autodidacta.",
      img: imgPreparatoria,
      imgWebp: imgPreparatoriaWebp
    },
    {
      titulo: "Universidad",
      fecha: "2021",
      descripcion: "En 2021 comencé mi carrera en Ingeniería de Software en la UAdeO. Esta etapa ha sido clave para fortalecer mis conocimientos y seguir creciendo profesionalmente.",
      img: imgUniversidad,
      imgWebp: imgUniversidadWebp
    },
    {
      titulo: "McDonald's",
      fecha: "2022",
      descripcion: "Durante las vacaciones del tercer semestre, busqué una experiencia laboral y terminé trabajando en McDonald's. Me ofrecieron un ascenso a entrenador con un horario flexible, lo que me permitió combinar el trabajo con mis estudios. Fue una experiencia que me enseñó mucho sobre responsabilidad y trabajo en equipo.",
      img: imgMcondalds,
      imgWebp: imgMcondaldsWebp
    },
    {
      titulo: "Sabatino",
      fecha: "2023",
      descripcion: "En quinto semestre decidí cambiar mi modalidad de estudios a sabatina, ya que sentía que la universidad no se alineaba con mis intereses en programación. Esto me permitió dedicar más tiempo al aprendizaje autodidacta, una decisión que considero acertada en mi desarrollo como programador.",
      img: imgSabatino,
      imgWebp: imgSabatinoWebp
    },
    {
      titulo: "Gerencia",
      fecha: "2023",
      descripcion: "En 2023 tuve la oportunidad de asumir un puesto gerencial en la empresa. Fue un reto que me ayudó a crecer tanto profesional como personalmente. En 2025 decidí cerrar ese ciclo y finalizar mi etapa laboral en la empresa, llevándome muchos aprendizajes.",
      img: imgGerente,
      imgWebp: imgGerenteWebp
    },
    {
      titulo: "Practicas",
      fecha: "2025",
      descripcion: "En enero de 2025 comencé mi periodo de prácticas profesionales en Guadalajara. Esto me llevó a tomar la decisión de renunciar a McDonald's en Mazatlán. Actualmente, realizo mis prácticas en iNNCi, donde participo en el desarrollo de diferentes proyectos internos utilizando múltiples tecnologías.",
      img: imgPracticas,
      imgWebp: imgPracticasWebp
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