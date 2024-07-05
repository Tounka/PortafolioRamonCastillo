import { CuadradoContenedor } from "../Componentes"
import { ImgPicture } from "../../Img"
import img from '../../../Img/bgPrincipal.jpg'
export const SeccionPrincipalUx = () =>{
    return(
        <>
            <ImgPicture src={img} bg={true} alt= 'Imagen de fondo principal' />
            <CuadradoContenedor />
        </>

       
    )
}