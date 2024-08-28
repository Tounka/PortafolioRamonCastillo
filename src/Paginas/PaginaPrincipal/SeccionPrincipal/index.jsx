
import styled from "styled-components"
import { SeccionPrincipalUx } from "./SeccionPrincipalUx"
import { ContenedorPrincipal } from "../../Display"


export const SeccionPrincipal = () =>{
    return(
        <ContenedorPrincipal id="main">

            <SeccionPrincipalUx />
            
        </ContenedorPrincipal>
    )
}