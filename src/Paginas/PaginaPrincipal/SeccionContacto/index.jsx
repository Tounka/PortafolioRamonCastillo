import styled from "styled-components"
import { ContenedorGenerico } from "../../Display"
import { PaginaContactoUx } from "./PaginaContactoUx"
const ContenedorContacto = styled(ContenedorGenerico)`
    margin-left: 100%;
    margin-left: 100dvw;
    height: 100dvh;
`

export const SeccionContacto = () => {
    return(
        <ContenedorContacto id="Contacto">
            <PaginaContactoUx />
        </ContenedorContacto>
    )
}
