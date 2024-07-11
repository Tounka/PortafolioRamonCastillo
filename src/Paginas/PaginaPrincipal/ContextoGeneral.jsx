import React, { createContext, useState } from 'react';
import imgPreparatoria from "../../Img/imgPreparatoria.png"
import imgSecundaria from "../../Img/imgSecundaria.png"
import imgUniversidad from "../../Img/imgUniversidad.webp"
import imgMcondalds from "../../Img/imgMcDonalds.jpg"
import imgSabatino from "../../Img/imgSabatino.jpg"
import imgGerente from "../../Img/imgGerente.jpg"

const ContextoGeneral = createContext();

const ContextoProviderGeneral = ({ children }) => {

  const [boolSlider, setBoolSlider] = useState(false);
  const Datos = [
    {
      titulo: "Nacimiento",
      fecha: "07/07/2003",
      descripcion: "Nací un 7 de julio de 2003, el mismo año en que salió la PlayStation Slim y se descifra casi por completo el genoma humano. Mi nacimiento es sin duda un acontecimiento que marca un antes y un después en la historia humana. ",
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-jor4MRYg8l38d_rJocGsiXoBygToYlSoM-7BNkxd4lNVK-f5CxlBbO3T9BFokPhKGiw5kM0GBwKw2TKbSnwggykF5hIPY3eLRtVdNS0'
    },
    {
      titulo: "Secundaria",
      fecha: "2014",
      descripcion: "Recién graduado del colegio Begsu, ingresé a la universidad latinoamericana. Lugar en donde formé buenas amistades que a día de hoy sigo teniendo en estima. En esta etapa de mi vida, donde todo era más sencillo, formé más mi individualidad y se empezó a desarrollar la persona que soy ahora. ",
      img: imgSecundaria
    },
    {
      titulo: "Preparatoria",
      fecha: "2017",
      descripcion: "Cursé la preparatoria en José Vasconcelos, donde elegí Informática como optativa y Físico-Matemático como área disciplinar   (las buenas). En esta etapa de mi vida terminé de desarrollar gran parte de mi personalidad y ese gusto que tenía por la informática se terminó convirtiendo en una pasión por la programación. Si bien no adquirí habilidades muy avanzadas de desarrollo, se me capacitó con las bases en lógica para desarrollar mis habilidades por mí mismo.",
      img: imgPreparatoria
    },
    {
      titulo: "Universidad",
      fecha: "2021",
      descripcion: "En 2021 comencé mis estudios universitarios en UAdeO como Ingeniero de Software, carrera que sigo cursando a día de hoy. La universidad me ha permitido asistir a múltiples charlas y eventos en donde he aprendido más sobre el desarrollo, estas son las que considero las experiencias más enriquecedoras de la carrera. Trato de no quedarme solo con lo que me enseñan aquí, soy aficionado en el estudio autodidacta y en la producción de software en mi tiempo libre.  ",
      img: imgUniversidad
    },
    {
      titulo: "McDondalds",
      fecha: "2022",
      descripcion: "En las vacaciones del tercer semestre tomé la decisión de buscar un empleo temporal, terminé entrando a McDonald. Terminando las vacaciones, se me ofreció un ascenso como entrenador y me ofrecieron un horario que se compaginaba con mi vida de estudiante, por lo que decidí continuar.",
      img: imgMcondalds
    },
    {
      titulo: "Sabatino",
      fecha: "2023",
      descripcion: "En 5to semestre, tome la decisión de continuar mis estudios de forma sabatina, sentía que la universidad no me estaba especializando en el tipo de programación que buscaba, por lo que a partir de esta fecha comienzan mis estudios de forma autodidacta. Mirando al pasado creo que ha sido una muy buena decisión, pues me permitió desarrollar mis habilidades como programador. ",
      img: imgSabatino
    },
    {
      titulo: "Gerencia",
      fecha: "2023",
      descripcion: "En 2023 se me dio la oportunidad de continuar desarrollándome dentro de la empresa y se me otorgó un puesto gerencial, cargo con el que continuó. La experiencia que he tenido me ha desarrollado mucho como persona . ",
      img: imgGerente
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