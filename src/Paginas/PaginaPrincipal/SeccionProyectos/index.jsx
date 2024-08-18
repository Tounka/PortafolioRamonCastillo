
import { ContenedorPrincipal } from "../../Display"
import styled from "styled-components"
import { SeccionProyectosUx } from "./ProyectosUx"
const ContenedorSeccionProyectos = styled(ContenedorPrincipal)`
    margin-left: 100%;
    
    justify-content: start;
    padding: 30px 0;
    background-color: black;
    overflow: scroll;
    overflow-x: hidden;
`
export const SeccionProyectos = () =>{
    return(
        <ContenedorSeccionProyectos id="proyectos">

            <SeccionProyectosUx />
            
        </ContenedorSeccionProyectos>
    )
}