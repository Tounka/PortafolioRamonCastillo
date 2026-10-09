import styled from "styled-components"
import { ImgPicture } from "../../Img"
import foto from '../../../Img/RamonCastillo.jpg'
import fotoWebp from '../../../Img/RamonCastillo.webp'
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaAngleDown } from "react-icons/fa";

import { useContext, useState } from "react";
import clipboardCopy from 'clipboard-copy';
import { ContextoGeneral } from "../ContextoGeneral"

const resorte = { type: "spring", stiffness: 260, damping: 26 };

// Mismo lenguaje que la tarjeta del carrusel de /#tecnologias: entra con resorte y reparte su contenido.
const varianteCard = {
    oculto: { opacity: 0, y: 40, rotate: -1.5, scale: 0.96 },
    visible: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { ...resorte, staggerChildren: 0.12, delayChildren: 0.1 } }
};

const varianteGrupo = {
    oculto: {},
    visible: { transition: { staggerChildren: 0.09 } }
};

const varianteElemento = {
    oculto: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: resorte }
};

const varianteFila = {
    oculto: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: resorte }
};

const varianteFoto = {
    oculto: { opacity: 0, scale: 0.5, rotate: -20 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 18 } }
};

const varianteSubrayado = {
    oculto: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 } }
};

const varianteRed = {
    oculto: { opacity: 0, scale: 0.3, rotate: -30 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 420, damping: 16 } }
};

const TituloStyled = styled(motion.h3)`
    position: relative;
    display: inline-block;
    margin: 0;
    padding: 0 30px 0 10px;
    font-size: ${props => props.$size};
    color: black;
    text-align: center;

    @media (max-width: 400px){
        font-size: ${props => props.$sizeMovil || props.$size};
    }
`
const SubrayadoStyled = styled(motion.span)`
    position: absolute;
    inset: 0;
    background-color: var(--AmarilloEspecial);
    clip-path: polygon(0 0, 100% 0%, 90% 100%, 0% 100%);
    transform-origin: 0 50%;
`
// Título con el subrayado amarillo inclinado que se dibuja de izquierda a derecha.
const TituloSubrayado = ({ txt, size, sizeMovil }) => (
    <TituloStyled $size={size} $sizeMovil={sizeMovil} variants={varianteElemento}>
        <SubrayadoStyled aria-hidden="true" variants={varianteSubrayado} />
        <span style={{ position: 'relative' }}>{txt}</span>
    </TituloStyled>
)

const CardContacto = styled(motion.section)`
    height: 600px;
    width: 90%;
    max-width: 1200px;
    background-color: white;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    justify-content: space-between;

    @media (max-width: 700px) {
        height: 95%;
    }
`
const ContenedorTopCardContacto = styled.div`
    display:grid;
    grid-template-columns: 1fr 2fr;
    padding: 40px 20px 20px 20px ;
    height: 90%;
    max-height: 500px;

     gap: 30px;
    @media (max-width: 700px) {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px 10px;
        max-height: 800px;
    }

`
const ContenedorIzquierdoStyled = styled(motion.div)`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;

    gap: 30px;
    @media (max-width: 700px) {
        gap: 10px;
   }
`
const ContenedorImg = styled(motion.div)`
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    box-shadow: 0 0 0 6px var(--AmarilloEspecial), 0 18px 40px rgba(0, 0, 0, 0.25);

    & > div {
        border-radius: 50%;
        overflow: hidden;
    }

    /* Pulso amarillo suave alrededor de la foto, como el anillo de /#tecnologias */
    &::after {
        content: '';
        position: absolute;
        inset: -14px;
        border: 2px solid rgba(252, 183, 28, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: contacto-pulso 2.4s ease-out infinite;
    }

    @keyframes contacto-pulso {
        from { opacity: 1; transform: scale(0.94); }
        to { opacity: 0; transform: scale(1.12); }
    }

    @media (prefers-reduced-motion: reduce) {
        &::after { animation: none; }
    }

   @media (max-width: 700px) {
        width: 250px;
   }
`
const ContenedorIzquierdo = () => {
    return (
        <ContenedorIzquierdoStyled variants={varianteGrupo}>
            <ContenedorImg variants={varianteFoto}>
                <ImgPicture src={foto} srcWebp={fotoWebp} alt='Imagen de perfil' />
            </ContenedorImg>
            <TituloSubrayado size='34px' sizeMovil='28px' txt='Ramon Castillo' />
        </ContenedorIzquierdoStyled>
    )
}
const ContenedorDerechoStyled = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    height: 100%;
    width:  100%;
`
const ContenedorBtnStyled = styled.button`
     font-size: 45px;
        height: 70px;
        width: 70px;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border: none;

    cursor: pointer;

    transition: transform .3s ease;
    &:hover{
        transform: scale(1.1);
        transition: transform .3s ease;
    }

    background: ${props => props.color ? props.color : ''};
`

const ContenedorBtns = styled(motion.div)`
    display: flex;
    justify-content: space-evenly;
`
const BtnRedesSociales = ({ url, icono, color }) => {
    const handleClick = () => {
        window.location.href = url;
    };
    return (
        <motion.div variants={varianteRed}>
            <ContenedorBtnStyled color={color} onClick={() => handleClick()}>
                {icono}
            </ContenedorBtnStyled>
        </motion.div>
    )
}


const ContenedorInfoContactoStyled = styled(motion.div)`
    display: grid;
    grid-template-columns: 1fr 2fr;
    width: 100;

    gap: 10px;
    &> * {
        margin:0;
    }
      @media (max-width: 600px) {
        display: flex;
        flex-direction: column;

    }
`
const TxtInfoContactoStyled = styled.p`
    font-size: ${props => props.size ? props.size : '32px;'};
    color: black;
    text-align: ${props => props.alingR ? 'right !important' : 'left'};
    font-weight: ${props => props.bold ? 'bold' : ''};
    cursor: ${props => props.pointer ? 'pointer' : ''};
    text-align: center;

    @media (max-width: 600px) {
        display: ${props => props.dpnone ? 'none' : ''};
    }

    user-select: text;
`
const TxtInfoContactoBgStyled = styled(TxtInfoContactoStyled)`
    position: relative;
    z-index: 100;
    font-size: 22px;
    display: flex;
    padding-left: 10px;
    padding-right: 30px;
    align-items: center;
    overflow: hidden;
    max-width: 350px;

    width: max-content;
    margin: 0;

    &::after {
        content: '';
        position: absolute;
        width: ${props => props.hover ? '100%' : '0%'};
        height: 100%;
        background-color: var(--AmarilloEspecial);
        z-index: -1;
        left: 0;
        clip-path: polygon(0 0, 100% 0%, 90% 100%, 0% 100%);

        transition: width .4s ;
    }

       @media (max-width: 600px) {
        font-size: 24px;
    }
    @media (max-width: 400px){
        font-size: 20px;
    }
`
const ContenedorInferiorBtnStyled = styled(motion.button)`
    position: relative;
    border: none;
    background-color: var(--AmarilloEspecial);
    width: 100%;
    height: 10%;
`
// Línea negra que recorre la barra al entrar, como el progreso del carrusel de /#tecnologias.
const LineaBarra = styled(motion.span)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: #000;
    transform-origin: 0 50%;
`
const ContenedoroIcono = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    font-size: 42px;
    cursor: pointer;
    transition: height .2s ease-in-out;
    &:hover{
        height: 110%;
        transition: height .2s ease-in-out;
    }
`
const varianteLineaBarra = {
    oculto: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 } }
};

const ContenedorInferiorBtn = () => {
    const { irASeccion } = useContext(ContextoGeneral);
    const handleClick = () => irASeccion("main");
    return (
        <ContenedorInferiorBtnStyled onClick={handleClick} variants={varianteElemento} aria-label="Ir a la sección principal">
            <LineaBarra aria-hidden="true" variants={varianteLineaBarra} />
            <ContenedoroIcono>
                <motion.span
                    style={{ display: 'flex' }}
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FaAngleDown />
                </motion.span>
            </ContenedoroIcono>
        </ContenedorInferiorBtnStyled>
    )
}
const ContenedorTxtInfoContacto = styled.div`
    height: 100%;
    width: 100%;
    display: flex;

    align-items: center;

     @media (max-width: 600px) {
        justify-content: center;
        align-items: center;
    }
`
const InfoContacto = ({ tipo = 'digita', txt = 'ingresa' }) => {
    const [hover, setHover] = useState(false);
    const handleMouseOver = () => {
        setHover(true);
    };

    const handleMouseOut = () => {
        setHover(false);
    };
    const handleClick = () => {
        clipboardCopy(txt)
            .then(() => alert(`"${txt}" copiado al portapapeles`))
            .catch(err => console.error('Error al copiar al portapapeles: ', err));
    }

    return (
        <ContenedorInfoContactoStyled variants={varianteFila}>

            <TxtInfoContactoStyled dpnone alingR bold pointer size={'28px'}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={handleClick}
            >{tipo}</TxtInfoContactoStyled>

            <ContenedorTxtInfoContacto onClick={handleClick}>
                <TxtInfoContactoBgStyled hover={hover} >{txt}</TxtInfoContactoBgStyled>
            </ContenedorTxtInfoContacto>

        </ContenedorInfoContactoStyled>
    )
}

const ContenedorTxtContacto = styled(motion.div)`
    display: flex;
    justify-content:center;
    width:100%;

    @media (max-width: 700px){
        display:none;
    }
`
const ContenedorInfoContacto = styled(motion.address)`
    font-style: normal;
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    gap: 20px;

    @media (max-width: 700px){
        gap: 10px;
    }
`
const ContenedorDerecho = () => {
    return (
        <ContenedorDerechoStyled variants={varianteGrupo}>
            <ContenedorTxtContacto variants={varianteGrupo}>
                <TituloSubrayado txt='Contacto' size='40px' />
            </ContenedorTxtContacto>

            <ContenedorInfoContacto variants={varianteGrupo}>
                <InfoContacto tipo='Correo:' txt='Luisarraca@hotmail.com' />
                <InfoContacto tipo='Teléfono:' txt='6691382961' />
                <InfoContacto tipo='Localidad:' txt='Guadalajara, Jalisco' />
            </ContenedorInfoContacto>

            <ContenedorBtns variants={varianteGrupo}>
                <BtnRedesSociales
                    url="https://www.facebook.com/luisramon.arrayalescastillo?mibextid=ZbWKwL"
                    icono={<FaFacebookF />}
                    color='#0866FF'
                />
                <BtnRedesSociales
                    url="https://www.instagram.com/luis_rcas?igshid=NGVhN2U2NjQ0Yg%3D%3D"
                    icono={<FaInstagram />}
                    color='linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)'
                />
                <BtnRedesSociales
                    url="https://api.whatsapp.com/send/?phone=526691382961&text&type=phone_number&app_absent=0"
                    icono={<FaWhatsapp />}
                    color='#25D366'
                />
            </ContenedorBtns>

        </ContenedorDerechoStyled>
    )
}

export const PaginaContactoUx = ({ activa }) => {
    return (
        <CardContacto variants={varianteCard} initial="oculto" animate={activa ? "visible" : "oculto"}>
            <ContenedorTopCardContacto>
                <ContenedorIzquierdo />
                <ContenedorDerecho />
            </ContenedorTopCardContacto>

            <ContenedorInferiorBtn />
        </CardContacto>
    )
}
