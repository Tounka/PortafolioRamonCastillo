import styled from "styled-components";
import { FaAngleLeft } from "react-icons/fa";
import { ImgPicture } from "../../Img";
import { TxtPrincipalStyled } from "../../../ComponentesGenerales/TxtPrincipal";
import { useContext } from "react";
import { ModalContext } from "./ContextoModal";
import imgPreparatoria from "../../../Img/imgPreparatoria.png"
import imgSecundaria from "../../../Img/imgSecundaria.png"
import imgUniversidad from "../../../Img/imgUniversidad.webp"
import imgMcondalds from "../../../Img/imgMcDonalds.jpg"
import imgSabatino from "../../../Img/imgSabatino.jpg"
import imgGerente from "../../../Img/imgGerente.jpg"
const ContenedorLineaTiempo = styled.div`
  position: relative;
  height: 100%;
 
  display: flex;
  
  align-items:center;

  padding: 0 20px; /* Agrega padding a ambos lados */

`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  
  height: 4px;
  

  border-radius: 2px;
  background-color: var(--AmarilloEspecial);
  gap: 20px;
`;

const Btn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--AmarilloEspecial);
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: bold;
`;
const BtnInicialFinal = styled(Btn)`
  margin-top: -38px;
  width: 80px;
  height: 80px;
  margin-right: ${props => props.final ?'' : '30px'};
  cursor: pointer;
`
const ContenedorItemLineaDeTiempoStyled = styled.div`
  display: flex;
  flex-direction: ${props => props.side ? 'column-reverse' : 'column'}; 
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 300px;
  margin-top: ${props => props.side ? '-280px' : '-18px'};


  @media (max-width : 400px) {
      width: 200px;
  }
  
`
const ContenedorImg = styled.div`
  height: 200px;
  width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;

  @media (max-width : 400px) {
      width: 250px;
  }
`
const TxtItemLineaTiempo = styled(TxtPrincipalStyled)`
  color:white;
  font-size: bold;
  font-size: 24px;
 
`
const ContenedorDescripcion = styled.div`
  height: 50px;
  width: 100%;
  background-color: white;
  text-align:Center;
  position: absolute;
  bottom: ${props => props.side ? '100' : '0'};
  z-index: 2;
  padding: 0 20px; 

  overflow: hidden;

  @media (max-width : 400px) {
      padding: 0 10px; 
      font-size: 16px;
  }
`

const ItemLineaTiempo = ({numero, titulo, descripcion, img, side}) =>{
  const {setEstadoModal, setInformacionModal, informacionModal} = useContext(ModalContext);
  const handleClick = ()=> {
    console.log(informacionModal);
    setInformacionModal({img: img, descripcion:descripcion, titulo: titulo});
    setEstadoModal(true);
    console.log(informacionModal);
  }
  return(
    <ContenedorItemLineaDeTiempoStyled side={side} onClick={() => handleClick()}>
        <Btn> {numero} </Btn>
        <TxtItemLineaTiempo>{titulo}</TxtItemLineaTiempo>
        <ContenedorImg> <ImgPicture bg  alt={'Img ' + titulo} src={img}  zIndex = {1}/> <ContenedorDescripcion side={side}>{descripcion}</ContenedorDescripcion>  </ContenedorImg>
       
    </ContenedorItemLineaDeTiempoStyled>
  )
}

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
export const SeccionLineaDeTiempoUx = () => {
  const handleClick = () => {
    const element = document.getElementById('main');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
  return (
    <ContenedorLineaTiempo>
      <Line>
        <BtnInicialFinal onClick={handleClick}><FaAngleLeft size={'32px'} /></BtnInicialFinal>
        {Datos.map((data, index) => (
          <ItemLineaTiempo key={index} side = {(index % 2 == 0)} numero={index} titulo ={data.titulo} descripcion={data.descripcion} img={data.img} >{data}</ItemLineaTiempo>
        ))}

        <BtnInicialFinal final>Final</BtnInicialFinal>
      </Line>
  
    </ContenedorLineaTiempo>
  );
};