
import { ContenedorPrincipal } from "../../Display"
import styled from "styled-components"
import { SeccionProyectosV2Ux } from "./ProyectosUxV2"
const ContenedorSeccionProyectos = styled(ContenedorPrincipal)`
    margin-left: 100%;
    
    justify-content: start;
    padding: 30px 0;
    background-color: black;
    overflow: scroll;
    overflow-x: hidden;
`
export const SeccionProyectosV2 = () =>{
    return(
        <ContenedorSeccionProyectos id="proyectos">

            <SeccionProyectosV2Ux />
            
        </ContenedorSeccionProyectos>
    )
}