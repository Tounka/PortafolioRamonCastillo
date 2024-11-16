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
      descripcion: "Nací el 7 de julio de 2003, el mismo año en que salió la PlayStation Slim, en Mazatlán, Sinaloa.",
      img: imgGatito,
      imgWebp: imgGatitoWebp
    },
    {
      titulo: "Secundaria",
      fecha: "2014",
      descripcion: "Recién graduado del colegio Begsu, ingresé a la multiversidad latinoamericana. Lugar en donde formé buenas amistades que a día de hoy sigo teniendo en estima.",
      img: imgSecundaria,
      imgWebp: imgSecundariaWebp
    },
    {
      titulo: "Preparatoria",
      fecha: "2017",
      descripcion: "Cursé la preparatoria en José Vasconcelos, donde elegí Informática como optativa y Físico-Matemático como área disciplinar. En esta etapa de mi vida terminé de desarrollar gran parte de mi personalidad y ese gusto que tenía por la informática se terminó convirtiendo en una pasión por la programación. Si bien no adquirí habilidades muy avanzadas de desarrollo, se me capacitó con las bases en lógica para desarrollar mis habilidades por mí mismo.",
      img: imgPreparatoria,
      imgWebp: imgPreparatoriaWebp
    },
    {
      titulo: "Universidad",
      fecha: "2021",
      descripcion: "En 2021 comencé mis estudios universitarios en UAdeO como Ingeniero de Software",
      img: imgUniversidad,
      imgWebp: imgUniversidadWebp
    },
    {
      titulo: "McDondalds",
      fecha: "2022",
      descripcion: "Durante las vacaciones del tercer semestre, decidí buscar un empleo temporal y terminé trabajando en McDonald's. Al finalizar las vacaciones, me ofrecieron un ascenso a entrenador y un horario que se adaptaba a mi vida de estudiante, por lo que decidí continuar en el empleo.",
      img: imgMcondalds,
      imgWebp: imgMcondaldsWebp
    },
    {
      titulo: "Sabatino",
      fecha: "2023",
      descripcion: "En quinto semestre, tomé la decisión de continuar mis estudios de forma sabatina, ya que sentía que la universidad no me estaba especializando en el tipo de programación que buscaba. A partir de esa fecha, me enfoqué más en estudiar de forma autodidacta. Mirando al pasado, creo que fue una excelente decisión, pues me permitió desarrollar mis habilidades como programador.",
      img: imgSabatino,
      imgWebp: imgSabatinoWebp
    },
    {
      titulo: "Gerencia",
      fecha: "2023",
      descripcion: "En 2023 se me dio la oportunidad de continuar desarrollándome dentro de la empresa y se me otorgó un puesto gerencial. La experiencia que he tenido me ha ayudado mucho a desarrollarme como persona.",
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