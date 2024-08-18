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

const ContextoGeneral = createContext();

const ContextoProviderGeneral = ({ children }) => {

  const [boolSlider, setBoolSlider] = useState(false);
  const Datos = [
    {
      titulo: "Nacimiento",
      fecha: "07/07/2003",
      descripcion: "Nací un 7 de julio de 2003, el mismo año en que salió la PlayStation Slim y se descifra casi por completo el genoma humano. Mi nacimiento es sin duda un acontecimiento que marca un antes y un después en la historia humana.",
      img: imgGatito,
      imgWebp: imgGatitoWebp
    },
    {
      titulo: "Secundaria",
      fecha: "2014",
      descripcion: "Recién graduado del colegio Begsu, ingresé a la multiversidad latinoamericana. Lugar en donde formé buenas amistades que a día de hoy sigo teniendo en estima. En esta etapa de mi vida, donde todo era más sencillo, formé más mi individualidad y se empezó a desarrollar la persona que soy ahora.",
      img: imgSecundaria,
      imgWebp: imgSecundariaWebp
    },
    {
      titulo: "Preparatoria",
      fecha: "2017",
      descripcion: "Cursé la preparatoria en José Vasconcelos, donde elegí Informática como optativa y Físico-Matemático como área disciplinar (las buenas). En esta etapa de mi vida terminé de desarrollar gran parte de mi personalidad y ese gusto que tenía por la informática se terminó convirtiendo en una pasión por la programación. Si bien no adquirí habilidades muy avanzadas de desarrollo, se me capacitó con las bases en lógica para desarrollar mis habilidades por mí mismo.",
      img: imgPreparatoria,
      imgWebp: imgPreparatoriaWebp
    },
    {
      titulo: "Universidad",
      fecha: "2021",
      descripcion: "En 2021 comencé mis estudios universitarios en UAdeO como Ingeniero de Software, carrera que sigo cursando a día de hoy. La universidad me ha permitido asistir a múltiples charlas y eventos en donde he aprendido más sobre el desarrollo, estas son las que considero las experiencias más enriquecedoras de la carrera. Trato de no quedarme solo con lo que me enseñan aquí, soy aficionado en el estudio autodidacta y en la producción de software en mi tiempo libre.",
      img: imgUniversidad,
      imgWebp: imgUniversidadWebp
    },
    {
      titulo: "McDondalds",
      fecha: "2022",
      descripcion: "En las vacaciones del tercer semestre tomé la decisión de buscar un empleo temporal, terminé entrando a McDonald. Terminando las vacaciones, se me ofreció un ascenso como entrenador y me ofrecieron un horario que se compaginaba con mi vida de estudiante, por lo que decidí continuar.",
      img: imgMcondalds,
      imgWebp: imgMcondaldsWebp
    },
    {
      titulo: "Sabatino",
      fecha: "2023",
      descripcion: "En 5to semestre, tome la decisión de continuar mis estudios de forma sabatina, sentía que la universidad no me estaba especializando en el tipo de programación que buscaba, por lo que a partir de esta fecha comienzan mis estudios de forma autodidacta. Mirando al pasado creo que ha sido una muy buena decisión, pues me permitió desarrollar mis habilidades como programador.",
      img: imgSabatino,
      imgWebp: imgSabatinoWebp
    },
    {
      titulo: "Gerencia",
      fecha: "2023",
      descripcion: "En 2023 se me dio la oportunidad de continuar desarrollándome dentro de la empresa y se me otorgó un puesto gerencial, cargo con el que continuó. La experiencia que he tenido me ha desarrollado mucho como persona.",
      img: imgGerente,
      imgWebp: imgGerenteWebp
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