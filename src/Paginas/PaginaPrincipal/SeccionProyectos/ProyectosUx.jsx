
import { CardProyecto } from "./CardProyecto"
import styled from "styled-components";
import { FaAngleUp } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { Data } from "./DataProyectos";
const ContenedorInferiorBtnStyled = styled.button`
    border: none;
    background-color: var(--AmarilloEspecial);
    width: 100%;
    height:60px;

    border-radius: 15px;

`

const ContenedoroIcono = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    
    

    font-size: 42px;
    cursor: pointer;
    transition: margin-top .2s ease-in-out;
    &:hover{
        margin-top: -10px;
        transition: margin-top .2s ease-in-out;
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
                <FaAngleUp />
            </ContenedoroIcono>
            
        </ContenedorInferiorBtnStyled>
     
    )
}
const ContenedorProyectosUx = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 1200px;
    gap: 20px;
    
`
export const SeccionProyectosUx = () =>{
    const useWindowWidth = () => {
        const [windowWidth, setWindowWidth] = useState(window.innerWidth);
      
        useEffect(() => {
          const handleResize = () => {
            setWindowWidth(window.innerWidth);
          };
      
          window.addEventListener('resize', handleResize);
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }, []);
      
        return windowWidth;
      };
      const windowWidth = useWindowWidth();
      const imgToUse = windowWidth < 450 ? 'img2' : 'img';
    return(
        <ContenedorProyectosUx>
            <ContenedorInferiorBtn />
            {Data.map((pagina, index) => (
            <CardProyecto
                key={index} // Usa una clave única para cada elemento renderizado
                titulo={pagina.nombre}
                descripcionCorta={pagina.descripcion}
                srcImg={pagina[imgToUse]}
                srcImg2={pagina.img2}
                tecnologias={pagina.tecnologias}
            />
            ))}
           
        </ContenedorProyectosUx>
       
        
        
    )
}