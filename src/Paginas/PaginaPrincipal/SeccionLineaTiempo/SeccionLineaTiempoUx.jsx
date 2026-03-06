import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ImgPicture } from "../../Img";
import { TxtPrincipalStyled } from "../../../ComponentesGenerales/TxtPrincipal";
import { useContext } from "react";
import { ModalContext } from "./ContextoModal";

import { ContextoGeneral } from "../ContextoGeneral";


const ContenedorLineaTiempo = styled.div`
  position: relative;
  height: 100dvh;
 
  display: flex;
  
  align-items:center;
 
  padding: 0 20px; /* Agrega padding a ambos lados */

`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4px;
  border-radius: 2px;
  background-color: var(--AmarilloEspecial);
  gap: 20px;
`;

const Btn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.$isSelected ? 'var(--AmarilloEspecial)' : 'var(--AmarilloEspecial)'};
  color: ${props => props.$isSelected ? 'black' : 'white'};
  text-shadow: ${props => props.$isSelected ? 'none' : '2px 2px 5px rgba(0, 0, 0, 0.5)'};
  border: ${props => props.$isSelected ? 'solid 1px var(--AmarilloEspecial)' : ''};
  transform: ${props => props.$isSelected ? 'scale(1.05)' : 'scale(1)'};
  font-weight: bold;
  flex-shrink: 0;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
`;

const BtnInicialFinal = styled(Btn)`
  width: 80px;
  height: 80px;
  margin-right: ${props => props.final ? '' : '30px'};
  cursor: pointer;
  z-index: 10;
`
const ContenedorItemLineaDeTiempoStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 300px;
  height: 40px;

  @media (max-width : 400px) {
      width: 250px;
  }
`

const WrapContenido = styled.div`
  position: absolute;
  ${props => props.side ? 'bottom: 35px;' : 'top: 35px;'}
  display: flex;
  flex-direction: ${props => props.side ? 'column-reverse' : 'column'};
  align-items: center;
  gap: 15px;
  width: 100%;
`

const ContenedorImg = styled.div`
  height: 250px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  overflow: hidden;
  border-radius: 0px;
  box-shadow: ${props => props.$isSelected ? '0 0 25px 5px rgba(255,215,0,0.4)' : '0 4px 15px rgba(0,0,0,0.5)'};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px) ;
  }
`

const TxtItemLineaTiempo = styled(TxtPrincipalStyled)`
  color: ${props => props.$isSelected ? 'var(--AmarilloEspecial)' : 'white'};
  font-size: 24px;
  margin: 0;
  transition: color 0.3s ease;
`

const ContenedorDescripcion = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 80px;
  background-color: rgba(255, 255, 255, 0.95);
  color: black;
  text-align: center;
  z-index: 2;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${ContenedorImg}:hover & {
    transform: translateY(60%);
  }

  @media (max-width : 400px) {
      font-size: 14px;
  }
`

const ItemLineaTiempo = ({ numero, titulo, descripcion, img, imgWebp = "", side, id, listaData }) => {
  const { setEstadoModal, setInformacionModal, informacionModal } = useContext(ModalContext);
  const { setBoolSlider, Datos, setPosicionTimeline, posicionTimeline } = useContext(ContextoGeneral);

  const isSelected = posicionTimeline === numero;

  const handleClick = () => {

    setInformacionModal({ img: img, descripcion: descripcion, titulo: titulo });
    setEstadoModal(true);
    setBoolSlider(false);

  }

  const handleClickBtn = () => {
    const element = document.getElementById(id);
    const elementPadre = document.getElementById('timeline');
    setPosicionTimeline(numero);
    if (element && elementPadre) {
      if (numero <= 0) {
        // Desplazarse al inicio
        elementPadre.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        // Calcular la posición para centrar sin salirse del contenedor
        const offsetLeft = element.offsetLeft;
        const elementWidth = element.clientWidth;
        const padreWidth = elementPadre.clientWidth;

        const scrollPosition = offsetLeft - (padreWidth / 2) + (elementWidth / 2);

        // Limitar el desplazamiento para no salirse del contenedor
        elementPadre.scrollTo({
          left: Math.max(0, Math.min(scrollPosition, elementPadre.scrollWidth - padreWidth)),
          behavior: 'smooth'
        });
      }
    }
  }
  return (
    <ContenedorItemLineaDeTiempoStyled id={id}>
      <Btn $isSelected={isSelected} name={'Boton mover a item numero ' + numero} onClick={() => handleClickBtn()}> {numero} </Btn>
      <WrapContenido side={side}>
        <TxtItemLineaTiempo $isSelected={isSelected}>{titulo}</TxtItemLineaTiempo>
        <ContenedorImg $isSelected={isSelected} onClick={() => handleClick()} >
          <ImgPicture bg alt={'Img ' + titulo} src={img} srcWebp={imgWebp} zIndex={1} />
          <ContenedorDescripcion>{descripcion}</ContenedorDescripcion>
        </ContenedorImg>
      </WrapContenido>
    </ContenedorItemLineaDeTiempoStyled>
  )
}



const ContenedorControl = styled.div`

  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  width: ${props => props.boolSlider ? '100px' : '0'};
  min-width: ${props => props.boolSlider ? '100px' : '0'};
  
  

  height: 50px;
  border-radius: 30px;

  background-color: var(--AmarilloEspecial);
  
  overflow: hidden;

  transition: width .3s ;

  opacity: .7;
  transition: .6s;
  transition-delay: 1s;
  &:hover {
    opacity: 1;
    transition: .3s;
  }
`
const BtnControlStyled = styled.button`
  height: 100%;
  width: 100%;
  font-size: 20px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: transparent;

  display: flex;
  justify-content:center;
  align-items: center;
`

const BtnControl = ({ fn, icono, listaData, name }) => {
  const { posicionTimeline, setPosicionTimeline } = useContext(ContextoGeneral);

  const handleClick = () => {

    let nuevaPosicion = posicionTimeline;

    if (fn === 1 && posicionTimeline > 1) {
      nuevaPosicion = posicionTimeline - 1;
    } else if (fn === 2 && posicionTimeline < listaData.length - 2) {
      nuevaPosicion = posicionTimeline + 1;
    }

    // Si la nueva posición es la misma que la actual, no hacer nada
    if (nuevaPosicion === posicionTimeline) return;

    setPosicionTimeline(nuevaPosicion);
    const elementPadre = document.getElementById('timeline');
    const posicion = listaData[nuevaPosicion];
    const element = document.getElementById(posicion);

    if (element && elementPadre) {
      if (nuevaPosicion <= 0) {
        // Desplazarse al inicio
        elementPadre.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        // Calcular la posición para centrar sin salirse del contenedor
        const offsetLeft = element.offsetLeft;
        const elementWidth = element.clientWidth;
        const padreWidth = elementPadre.clientWidth;

        const scrollPosition = offsetLeft - (padreWidth / 2) + (elementWidth / 2);

        // Limitar el desplazamiento para no salirse del contenedor
        elementPadre.scrollTo({
          left: Math.max(0, Math.min(scrollPosition, elementPadre.scrollWidth - padreWidth)),
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <BtnControlStyled name={name} listaData={listaData} onClick={() => handleClick()}>
      {icono}
    </BtnControlStyled>
  );
};

const ContenedorNumeroControl = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`
const ContenedorTexto = styled.p`
  font-size: 10px;
  text-align: center;
  position: absolute;
  top: -20px;
  left: calc(50% - 75px);
  width: 150px;
  color: var(--AmarilloEspecial);
  user-select: none;
  margin: 0;

  opacity: ${props => (props.boolSlider ? '1' : '0')};
  transform: ${props => (props.boolSlider ? 'translateX(0)' : 'translateX(-30px)')};
  pointer-events: ${props => (props.boolSlider ? 'auto' : 'none')};

  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: .8s;
`;


const ContenedorControlPadre = styled.div`
  position: fixed;
  z-index: 2000;
  bottom: 20px;
  width: auto;
  height: auto;
  left: calc(50% - 50px);


   
  `
const Control = ({ listaData }) => {

  const { boolSlider, posicionTimeline } = useContext(ContextoGeneral);
  return (
    <ContenedorControlPadre boolSlider={boolSlider}>

      <ContenedorTexto boolSlider={boolSlider}> (Da click en cada imagen) </ContenedorTexto>
      <ContenedorControl boolSlider={boolSlider}>
        <BtnControl name={'Control linea de tiempo anterior'} listaData={listaData} fn={1} icono={<FaAngleLeft />} />
        <ContenedorNumeroControl> {posicionTimeline} </ContenedorNumeroControl>
        <BtnControl name={'Control linea de tiempo siguiente'} listaData={listaData} fn={2} icono={<FaAngleRight />} />
      </ContenedorControl>
    </ContenedorControlPadre>
  )
}

export const SeccionLineaDeTiempoUx = ({ boolSlider }) => {
  const { setBoolSlider, Datos, posicionTimeline, setPosicionTimeline, setSeccionSeleccionada } = useContext(ContextoGeneral);
  const listaData = ['punto0', ...Datos.map((_, index) => `punto${index + 1}`), `punto${Datos.length + 1}`];
  const handleClick = () => {

    const element = document.getElementById('main');
    setSeccionSeleccionada("main")
    if (element) {

      element.scrollIntoView({ behavior: 'smooth' });
      setBoolSlider(false);
    }
  }
  return (
    <ContenedorLineaTiempo>

      <Line id={'punto0'}>
        <BtnInicialFinal onClick={handleClick}><FaAngleLeft size={'32px'} /></BtnInicialFinal>
        {Datos.map((data, index) => (
          <ItemLineaTiempo listaData={listaData[index + 1]} id={listaData[index + 1]} key={index} side={(index % 2 == 0)} numero={index + 1} titulo={data.titulo} descripcion={data.descripcion} img={data.img} imgWebp={data.imgWebp} setPosicionTimeline={setPosicionTimeline}>{data}</ItemLineaTiempo>
        ))}

        <BtnInicialFinal id={'punto9'} final>Final</BtnInicialFinal>
      </Line>
      <Control boolSlider={boolSlider} listaData={listaData} />
    </ContenedorLineaTiempo>
  );
};