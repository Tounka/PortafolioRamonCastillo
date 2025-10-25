import { CardProyectoV2 } from "./CardProyectoV2";
import styled from "styled-components";
import { FaAngleUp } from "react-icons/fa";
import { useState, useEffect, useContext } from 'react';
import { Data } from "./DataProyectos";
import { TxtGenerico } from "../../../ComponentesGenerales/TxtPrincipal";
import { ContextoGeneral } from "../ContextoGeneral";

const ContenedorInferiorBtnStyled = styled.button`
    border: none;
    background-color: var(--AmarilloEspecial);
    width: 100%;
    height: 60px;
    border-radius: 15px;
    cursor: pointer;
`;

const ContenedoroIcono = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    font-size: 42px;
    transition: margin-top 0.2s ease-in-out;

    &:hover {
        margin-top: -10px;
    }
`;

const ContenedorInferiorBtn = () => {
     const { setSeccionSeleccionada } = useContext(ContextoGeneral)
    const handleClick = () => {
        const element = document.getElementById('main');
        setSeccionSeleccionada("main")
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <ContenedorInferiorBtnStyled onClick={handleClick}>
            <ContenedoroIcono>
                <FaAngleUp />
            </ContenedoroIcono>
        </ContenedorInferiorBtnStyled>
    );
};

const ContenedorProyectosUx = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto; /* Centrar el contenedor */
    gap: 20px;
`;

const ContenedorGridProyectos = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    width: 100%;
    height: auto;

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

const ContenedorVertical = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const ContenedorMiniTxt = styled.div`
    max-width: 400px; ;

`;

export const SeccionProyectosV2Ux = () => {
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

    const contenedor1 = [];
    const contenedor2 = [];

    Data.forEach((pagina, index) => {
        if (index % 2 === 0) {
            contenedor1.push(pagina);
        } else {
            contenedor2.push(pagina);
        }
    });

    return (
        <ContenedorProyectosUx>
            <ContenedorInferiorBtn />
        
            <TxtGenerico size='16px' color='var(--AmarilloEspecial)' txt='(Da click para ir cada proyecto)'/>
   

            <ContenedorGridProyectos>
                <ContenedorVertical>
                    {contenedor1.map((pagina, index) => (
                        <CardProyectoV2
                            key={index}
                            titulo={pagina.nombre}
                            descripcionCorta={pagina.descripcion}
                            srcImg={windowWidth < 701 ? pagina.img : pagina[index % 2 === 1 ? 'img' : 'img2']}
                            srcImgWebp={windowWidth < 701 ? pagina.imgWebp : pagina[index % 2 === 1 ? 'imgWebp' : 'img2Webp']}
                            tecnologias={pagina.tecnologias}
                            url={pagina.url}
                        />
                    ))}
                </ContenedorVertical>

                <ContenedorVertical>
                    {contenedor2.map((pagina, index) => (
                        <CardProyectoV2
                            key={index}
                            titulo={pagina.nombre}
                            descripcionCorta={pagina.descripcion}
                            srcImg={windowWidth < 701 ? pagina.img : pagina[index % 2 === 0 ? 'img' : 'img2']}
                            srcImgWebp={windowWidth < 701 ? pagina.imgWebp : pagina[index % 2 === 0 ? 'imgWebp' : 'img2Webp']}
                            tecnologias={pagina.tecnologias}
                            url={pagina.url}
                        />
                    ))}
                </ContenedorVertical>
            </ContenedorGridProyectos>
        </ContenedorProyectosUx>
    );
};
