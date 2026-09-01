import { CardProyectoV2 } from "./CardProyectoV2";
import styled from "styled-components";
import { FaAngleUp } from "react-icons/fa";
import { useContext } from 'react';
import { Data as DataProyectosAnteriores } from "./DataProyectos";
import { DataProyectosV2 as DataProyectosNuevos } from "../../../nuevos-proyectos/DataProyectosV2";
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
    margin: 0 auto;
    gap: 20px;
`;

const ContenedorGridProyectos = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: start;
    gap: 16px;
    width: 100%;
    height: auto;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 700px) {
        grid-template-columns: minmax(0, 1fr);
    }
`;

const ContenedorColumna = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
`;

export const SeccionProyectosV2Ux = () => {
    const proyectosAnteriores = DataProyectosAnteriores.filter((pagina) => ![
        'Registros UAdeO',
        'Mc Donald\'s',
        'Invitación de Boda',
    ].includes(pagina.nombre));
    const invitacion = DataProyectosAnteriores.find(
        (pagina) => pagina.nombre === 'Invitación de Boda'
    );
    const Data = [
        ...proyectosAnteriores,
        ...DataProyectosNuevos,
        ...(invitacion ? [invitacion] : []),
    ];
    const columnas = [[], [], []];

    Data.forEach((pagina, index) => {
        columnas[index % 3].push(pagina);
    });

    return (
        <ContenedorProyectosUx>
            <ContenedorInferiorBtn />

            <TxtGenerico size='16px' color='var(--AmarilloEspecial)' txt='(Da click para ir cada proyecto)' />

            <ContenedorGridProyectos>
                {columnas.map((columna, columnaIndex) => (
                    <ContenedorColumna key={`columna-${columnaIndex}`}>
                        {columna.map((pagina, index) => (
                            <CardProyectoV2
                                key={`${pagina.nombre}-${columnaIndex}-${index}`}
                                titulo={pagina.nombre}
                                descripcionCorta={pagina.descripcion}
                                srcImg={pagina.img || pagina.img2}
                                srcImgWebp={pagina.imgWebp || pagina.img2Webp}
                                tecnologias={pagina.tecnologias}
                                url={pagina.url}
                                propiedadDe={pagina.propiedadDe}
                            />
                        ))}
                    </ContenedorColumna>
                ))}
            </ContenedorGridProyectos>
        </ContenedorProyectosUx>
    );
};