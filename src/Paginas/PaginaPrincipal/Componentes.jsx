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
        overflow: hidden;
        position: relative;
        
`

const Blur = styled.div`
    z-index: -1;
  position: absolute;
  position: absolute;
  

  width: 175px; // Adjust this value as needed
  height: 175px; // Adjust this value as needed

  @media (max-width: 800px) {
        width: 150px; // Adjust this value as needed
        height: 150px; // Adjust this value as needed
    }
    @media (max-width: 600px) {
        height: 100px;
        width: 100px;
    }
  
    overflow: hidden;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
`;
const BtnCuadrado = styled.button`
position: relative;
    border: none;
    overflow: hidden;
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
            
            <BtnCuadrado name="Botón ir a contacto" noLeft noTop onClick={ () => handleClick('Contacto')}> <Blur /> <h1>Contacto</h1></BtnCuadrado>
            <BtnCuadrado name="Botón ir a linea de tiempo" noTop onClick={ () => handleClick('timeline')}> <Blur /><h1>Mi Historia</h1></BtnCuadrado>
            <BtnCuadrado name="Botón ir a tecnologías" noLeft onClick={ () => handleClick('tecnologias')} ><Blur /><h1> Tecnologías</h1></BtnCuadrado>
            <BtnCuadrado name="Botón ir a proyectos"  onClick={ () => handleClick('proyectos')}   ><Blur /><h1> Proyectos </h1></BtnCuadrado>
    
        </CuadradoContenedorStyled>
    );
}