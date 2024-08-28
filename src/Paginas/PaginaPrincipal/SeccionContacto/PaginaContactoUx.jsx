import styled from "styled-components"
import { ImgPicture } from "../../Img"
import foto from '../../../Img/RamonCastillo.jpg'
import fotoWebp from '../../../Img/RamonCastillo.webp'
import { TxtPrincipal } from "../../../ComponentesGenerales/TxtPrincipal"
import { FaInstagram, FaFacebookF, FaWhatsapp, FaAngleDown   } from "react-icons/fa";

import { useState } from "react";
import clipboardCopy from 'clipboard-copy';

const CardContacto = styled.div`
    height: 600px;
    width: 800px;
    width: 90%;
    max-width: 1200px;
    background-color: white;
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
const ContenedorIzquierdoStyled = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;

    gap: 30px;
    @media (max-width: 700px) {
        gap: 10px;
   }
`
const ContenedorImg = styled.div`
    width: 100%;
    
    aspect-ratio: 1;
    border-radius: 50%;
    overflow:hidden;

   @media (max-width: 700px) {
        width: 250px;
   }
`
const ContenedorIzquierdo = () =>{
    return(
        <ContenedorIzquierdoStyled>
            <ContenedorImg>
                <ImgPicture src={foto} srcWebp={fotoWebp} alt='Imagen de perfil'/>
            </ContenedorImg>
            <TxtPrincipal size={'34px'} mediaDismFontSize txt={'Ramon Castillo'} subrayado/>
        </ContenedorIzquierdoStyled> 
    )
} 
const ContenedorDerechoStyled = styled.div`
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

    @media (max-width: 600px){
       
    }
    background: ${props => props.color ? props.color : ''};


`

const ContenedorBtns = styled.div`
    display: flex;
    justify-content: space-evenly;
`
const BtnRedesSociales = ({url, icono, color}) =>{
    const handleClick = () => {
        window.location.href = url;
      };
    return(
        <ContenedorBtnStyled color={color} onClick={() => handleClick()}>
            {icono}
        </ContenedorBtnStyled>
    )
}


const ContenedorInfoContactoStyled = styled.div`
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
    font-size: ${props => props.size ? props.size : '32px;' }; 
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
    width: auto;
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
const ContenedorInferiorBtnStyled = styled.button`
    border: none;
    background-color: var(--AmarilloEspecial);
    width: 100%;
    height: 10%;

   


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
const ContenedorInferiorBtn = () =>{
    const handleClick = () => {
        const element = document.getElementById('main');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return(
        <ContenedorInferiorBtnStyled onClick={handleClick}>
            <ContenedoroIcono>
                <FaAngleDown />
            </ContenedoroIcono>
            
        </ContenedorInferiorBtnStyled>
     
    )
}
const ContenedorTxtInfoContacto= styled.div`
    height: 100%;
    width: 100%;
    display: flex;
  
    align-items: center;

     @media (max-width: 600px) {
        justify-content: center;
        align-items: center;
        
    }

    
`
const InfoContacto = ({tipo = 'digita', txt='ingresa' }) => {
    const [hover, setHover] = useState(false); 
    const handleMouseOver = () => {
        setHover(true);
        console.log(hover);
      };
    
      const handleMouseOut = () => {
        setHover(false);
        console.log(hover);
      };
    const handleClick = () =>{
        clipboardCopy(txt)
        .then(() => alert(`"${txt}" copiado al portapapeles`))
        .catch(err => console.error('Error al copiar al portapapeles: ', err));
    }

    return(
        <ContenedorInfoContactoStyled>

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

const ContenedorTxtContacto = styled.div`
    display: flex;
    justify-content:center;
    width:100%;
    
    @media (max-width: 700px){
        display:none;

    }
`
const ContenedorInfoContacto = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    gap: 20px;

    @media (max-width: 700px){
        gap: 10px;
    }
`
const ContenedorDerecho = () =>{
    return(
        <ContenedorDerechoStyled>
            <ContenedorTxtContacto>
                <TxtPrincipal txt='Contacto' subrayado size='40px'/>
            </ContenedorTxtContacto>

            <ContenedorInfoContacto>
                <InfoContacto tipo='Correo:' txt='Luisarraca@hotmail.com' />
                <InfoContacto tipo='Teléfono:' txt='6691382961' />
                <InfoContacto tipo='Localidad:' txt='Mazatlan, Sinaloa' />

            </ContenedorInfoContacto>
    
            


            <ContenedorBtns>
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

export const PaginaContactoUx = () =>{
    return(
        <CardContacto>
            <ContenedorTopCardContacto>
                <ContenedorIzquierdo />
                <ContenedorDerecho />
            </ContenedorTopCardContacto>

            <ContenedorInferiorBtn />
        </CardContacto>
    )
}