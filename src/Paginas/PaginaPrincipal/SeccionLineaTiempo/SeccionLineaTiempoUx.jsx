import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ImgPicture } from "../../Img";
import { TxtPrincipalStyled } from "../../../ComponentesGenerales/TxtPrincipal";
import { useContext } from "react";
import { ModalContext } from "./ContextoModal";

import { ContextoGeneral } from "../ContextoGeneral";


import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const limitar = (valor, minimo, maximo) => Math.min(Math.max(valor, minimo), maximo);

const animarScrollHorizontal = (contenedor, destino) => {
  if (!contenedor) return;

  const maximo = Math.max(0, contenedor.scrollWidth - contenedor.clientWidth);
  const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gsap.to(contenedor, {
    scrollLeft: limitar(destino, 0, maximo),
    duration: movimientoReducido ? 0 : 0.65,
    ease: 'power3.out',
    overwrite: 'auto',
  });
};

const ContenedorLineaTiempo = styled.div`
  position: relative;
  height: 100dvh;
 
  display: flex;
  
  align-items:center;
 
  padding: 0 clamp(22px, 5vw, 80px);
  overflow: hidden;
  isolation: isolate;
  background: radial-gradient(circle at center, rgba(252, 183, 28, .06), transparent 45%), linear-gradient(180deg, #090b10 0%, #030407 100%);

`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(252, 183, 28, .74), #ffe08a 50%, rgba(252, 183, 28, .74));
  box-shadow: 0 0 12px rgba(252, 183, 28, .22);
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
  border-radius: 22px;
  border: 1px solid rgba(255, 250, 240, .12);
  box-shadow: ${props => props.$isSelected ? '0 0 25px 5px rgba(255,215,0,0.4)' : '0 4px 15px rgba(0,0,0,0.5)'};
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  
  &:hover {
    transform: translateY(-7px);
    border-color: rgba(252, 183, 28, .6);
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
        animarScrollHorizontal(elementPadre, 0);
      } else {
        // Calcular la posición para centrar sin salirse del contenedor
        const offsetLeft = element.offsetLeft;
        const elementWidth = element.clientWidth;
        const padreWidth = elementPadre.clientWidth;

        const scrollPosition = offsetLeft - (padreWidth / 2) + (elementWidth / 2);

        // Limitar el desplazamiento para no salirse del contenedor
        animarScrollHorizontal(elementPadre, scrollPosition);
      }
    }
  }
  return (
    <ContenedorItemLineaDeTiempoStyled id={id} data-timeline-index={numero}>
      <Btn data-timeline-dot $isSelected={isSelected} name={'Boton mover a item numero ' + numero} onClick={() => handleClickBtn()}> {numero} </Btn>
      <WrapContenido data-timeline-content side={side}>
        <TxtItemLineaTiempo className="timeline-title" data-timeline-title $isSelected={isSelected}>{titulo}</TxtItemLineaTiempo>
        <ContenedorImg className="timeline-card" data-timeline-card $isSelected={isSelected} onClick={() => handleClick()} >
          <ImgPicture bg alt={'Img ' + titulo} src={img} srcWebp={imgWebp} zIndex={1} />
          <ContenedorDescripcion data-timeline-description>{descripcion}</ContenedorDescripcion>
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

    if (fn === 1 && posicionTimeline > 0) {
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
        animarScrollHorizontal(elementPadre, 0);
      } else {
        // Calcular la posición para centrar sin salirse del contenedor
        const offsetLeft = element.offsetLeft;
        const elementWidth = element.clientWidth;
        const padreWidth = elementPadre.clientWidth;

        const scrollPosition = offsetLeft - (padreWidth / 2) + (elementWidth / 2);

        // Limitar el desplazamiento para no salirse del contenedor
        animarScrollHorizontal(elementPadre, scrollPosition);
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
  const { setBoolSlider, Datos, posicionTimeline, setPosicionTimeline, seccionSeleccionada, setSeccionSeleccionada } = useContext(ContextoGeneral);
  const carrilRef = useRef(null);
  const destinoScrollRef = useRef(0);
  const listaData = ['punto0', ...Datos.map((_, index) => `punto${index + 1}`), `punto${Datos.length + 1}`];

  useLayoutEffect(() => {
    const carril = carrilRef.current;
    const timeline = carril?.closest('#timeline');
    if (!carril || !timeline || seccionSeleccionada !== 'timeline') return undefined;

    const puntos = gsap.utils.toArray('[data-timeline-index]', carril);
    const circulos = puntos.map((punto) => punto.querySelector('[data-timeline-dot]'));
    const contenidos = puntos.map((punto) => punto.querySelector('[data-timeline-content]'));
    const linea = carril.querySelector('[data-timeline-line]');
    const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animados = new Set();

    gsap.set(circulos, {
      autoAlpha: 0,
      scale: movimientoReducido ? 1 : 0,
      rotate: movimientoReducido ? .28 : -135,
      transformOrigin: 'center center',
    });

    const titulos = contenidos.map((contenido) => contenido.querySelector('[data-timeline-title]'));
    const tarjetas = contenidos.map((contenido) => contenido.querySelector('[data-timeline-card]'));
    const imagenes = tarjetas.map((tarjeta) => tarjeta?.querySelector('img')).filter(Boolean);

    gsap.set(contenidos, {
      autoAlpha: 0,
      y: (indice) => movimientoReducido ? .28 : indice % 2 === 0 ? -55 : 55,
    });

    gsap.set(titulos, {
      autoAlpha: 0,
      y: movimientoReducido ? .28 : 16,
    });

    gsap.set(tarjetas, {
      autoAlpha: 0,
      y: movimientoReducido ? .28 : 18,
      scale: movimientoReducido ? 1 : .9,
      transformOrigin: 'center center',
    });

    gsap.set(imagenes, {
      scale: movimientoReducido ? 1 : 1.12,
      transformOrigin: 'center center',
    });

    gsap.fromTo(
      linea,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: movimientoReducido ? .28 : 1.1,
        delay: movimientoReducido ? .28 : 0.2,
        ease: 'power3.out',
      },
    );

    const lineaPulso = gsap.to(linea, {
      boxShadow: '0 0 22px rgba(252, 183, 28, .42)',
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      paused: movimientoReducido,
    });

    const observador = new IntersectionObserver((entradas) => {
      const visibles = entradas
        .filter((entrada) => entrada.isIntersecting && !animados.has(entrada.target))
        .map((entrada) => entrada.target)
        .sort(
          (puntoA, puntoB) =>
            Number(puntoA.dataset.timelineIndex) - Number(puntoB.dataset.timelineIndex),
        );

      if (!visibles.length) return;

      visibles.forEach((punto, indice) => {
        animados.add(punto);
        observador.unobserve(punto);

        const circulo = punto.querySelector('[data-timeline-dot]');
        const contenido = punto.querySelector('[data-timeline-content]');
        const titulo = contenido?.querySelector('[data-timeline-title]');
        const tarjeta = contenido?.querySelector('[data-timeline-card]');
        const imagen = tarjeta?.querySelector('img');
        const secuencia = gsap.timeline({
          delay: movimientoReducido ? .28 : indice * 0.13,
          defaults: { overwrite: 'auto' },
        });

        secuencia
          .to(circulo, {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: movimientoReducido ? .28 : 0.65,
            ease: 'back.out(2)',
          })
          .to(contenido, {
            autoAlpha: 1,
            y: 0,
            duration: movimientoReducido ? .28 : 0.65,
            ease: 'power3.out',
          }, movimientoReducido ? .28 : '-=0.38')
          .to(titulo, {
            autoAlpha: 1,
            y: 0,
            duration: movimientoReducido ? .28 : 0.38,
            ease: 'power2.out',
          }, movimientoReducido ? .28 : '-=0.42')
          .to(tarjeta, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: movimientoReducido ? .28 : 0.62,
            ease: 'back.out(1.18)',
          }, movimientoReducido ? .28 : '-=0.28')
          .to(imagen, {
            scale: 1,
            duration: movimientoReducido ? .28 : 1.15,
            ease: 'power2.out',
          }, movimientoReducido ? .28 : '-=0.5');
      });
    }, {
      root: timeline,
      threshold: 0.18,
    });

    puntos.forEach((punto) => observador.observe(punto));

    return () => {
      observador.disconnect();
      lineaPulso.kill();
      gsap.killTweensOf([linea, ...circulos, ...contenidos, ...titulos, ...tarjetas, ...imagenes]);
      gsap.set([linea, ...circulos, ...contenidos, ...titulos, ...tarjetas, ...imagenes], { clearProps: 'all' });
    };
  }, [seccionSeleccionada]);

  useEffect(() => {
    const timeline = carrilRef.current?.closest('#timeline');
    if (!timeline) return undefined;

    destinoScrollRef.current = timeline.scrollLeft;

    const seleccionarPuntoMasCercano = (destino) => {
      const centro = destino + timeline.clientWidth / 2;
      const puntos = Array.from(timeline.querySelectorAll('[data-timeline-index]'));
      if (!puntos.length) return;

      const puntoCercano = puntos.reduce((cercano, punto) => {
        const distancia = Math.abs(punto.offsetLeft + punto.clientWidth / 2 - centro);
        return distancia < cercano.distancia
          ? { indice: Number(punto.dataset.timelineIndex), distancia }
          : cercano;
      }, { indice: 1, distancia: Number.POSITIVE_INFINITY });

      setPosicionTimeline(puntoCercano.indice);
    };

    const manejarRueda = (evento) => {
      if (evento.ctrlKey) return;

      const delta = Math.abs(evento.deltaY) >= Math.abs(evento.deltaX)
        ? evento.deltaY
        : evento.deltaX;
      if (Math.abs(delta) < 2) return;

      const maximo = Math.max(0, timeline.scrollWidth - timeline.clientWidth);
      const origen = gsap.isTweening(timeline)
        ? destinoScrollRef.current
        : timeline.scrollLeft;
      const destino = limitar(origen + delta * 1.35, 0, maximo);

      if (Math.abs(destino - timeline.scrollLeft) < 1) return;

      evento.preventDefault();
      evento.stopPropagation();
      destinoScrollRef.current = destino;
      seleccionarPuntoMasCercano(destino);
      animarScrollHorizontal(timeline, destino);
    };

    timeline.addEventListener('wheel', manejarRueda, { passive: false });

    return () => {
      timeline.removeEventListener('wheel', manejarRueda);
      gsap.killTweensOf(timeline);
    };
  }, [setPosicionTimeline]);

  const handleClick = () => {

    const element = document.getElementById('main');
    setSeccionSeleccionada("main")
    if (element) {

      element.scrollIntoView({ behavior: 'smooth' });
      setBoolSlider(false);
    }
  }
  return (
    <ContenedorLineaTiempo ref={carrilRef} data-scroll-interno>

      <Line id={'punto0'} data-timeline-line>
        <BtnInicialFinal onClick={handleClick}><FaAngleLeft size={'32px'} /></BtnInicialFinal>
        {Datos.map((data, index) => (
          <ItemLineaTiempo listaData={listaData[index + 1]} id={listaData[index + 1]} key={index} side={(index % 2 == 0)} numero={index + 1} titulo={data.titulo} descripcion={data.descripcion} img={data.img} imgWebp={data.imgWebp} setPosicionTimeline={setPosicionTimeline}>{data}</ItemLineaTiempo>
        ))}

        <BtnInicialFinal id={`punto${Datos.length + 1}`} final>Final</BtnInicialFinal>
      </Line>
      <Control boolSlider={boolSlider} listaData={listaData} />
    </ContenedorLineaTiempo>
  );
};
