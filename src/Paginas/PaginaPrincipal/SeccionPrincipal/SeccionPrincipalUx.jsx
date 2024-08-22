import { CuadradoContenedor } from "../Componentes"
import { ImgPicture } from "../../Img"

import img from '../../../Img/bgPrincipal.jpg'
import imgWebp from '../../../Img/bgPrincipal.webp'
import styled from "styled-components"

const ContenedorPrincipal = styled.div`
    width: 500px;
    height: 500px;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
`;
export const SeccionPrincipalUx = () =>{
    return(
        <ContenedorPrincipal>
            <ImgPicture src={img} srcWebp={imgWebp} bg={true} alt= 'Imagen de fondo principal' />
            <CuadradoContenedor />
        </ContenedorPrincipal>

       
    )
}