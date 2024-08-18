import { CuadradoContenedor } from "../Componentes"
import { ImgPicture } from "../../Img"

import img from '../../../Img/bgPrincipal.jpg'
import imgWebp from '../../../Img/bgPrincipal.webp'

export const SeccionPrincipalUx = () =>{
    return(
        <>
            <ImgPicture src={img} srcWebp={imgWebp} bg={true} alt= 'Imagen de fondo principal' />
            <CuadradoContenedor />
        </>

       
    )
}