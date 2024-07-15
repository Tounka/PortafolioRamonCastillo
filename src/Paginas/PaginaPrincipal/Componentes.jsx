import { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "./SeccionLineaTiempo/ContextoModal";
import { ContextoGeneral } from "./ContextoGeneral";

const CuadradoContenedorStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;

    height: 350px;
    width: 350px;
    
    @media (max-width: 800px) {
        height: 300px;
        width: 300px;
    }
    @media (max-width: 600px) {
        height: 200px;
        width: 200px;
    }

    
    
    transform: rotate(45deg);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);


  
`
const BtnCuadrado = styled.button`
    border: none;
    @media (max-width: 800px) {
        height: 150px;
        width: 150px;
    }
    @media (max-width: 600px) {
        height: 100px;
        width: 100px;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;

    font-size: 20px;
    color: white;
    background-color: #00000063;

    border-left: ${props => props.noLeft ? null : 'solid white 2px'};
    border-top: ${props => props.noTop ? null : 'solid white 2px'};
    

    h1 {
        transform: rotate(-45deg);
        margin: 0;
        font-size: 24px;
        @media (max-width: 600px) {
            font-size: 20px;
        }
    }

    cursor: pointer;
    transition: .1s ease-in;
    &:hover{
        background-color: #000000;
        transition: .1s ease-in;
    }
`

export const CuadradoContenedor = () => {
    const {setBoolSlider} = useContext(ContextoGeneral);
    const handleClick = (url) =>{
        const element = document.getElementById(url);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        if(url == 'timeline'){
            setBoolSlider(true);
        }
    }
    return (
        <CuadradoContenedorStyled>
            <BtnCuadrado noLeft noTop onClick={ () => handleClick('Contacto')}><h1>Contacto</h1></BtnCuadrado>
            <BtnCuadrado noTop onClick={ () => handleClick('timeline')}><h1>Mi Historia</h1></BtnCuadrado>
            <BtnCuadrado noLeft onClick={ () => handleClick('tecnologias')} ><h1> Tecnologías</h1></BtnCuadrado>
            <BtnCuadrado    ><h1> 4 </h1></BtnCuadrado>
    
        </CuadradoContenedorStyled>
    );
}