import styled from "styled-components"
import { ContenedorGenerico } from "../../Display"
import { SeccionHabilidadesUx } from "./SeccionHabilidadesUX"

const ContenedorSeccionHabilidades = styled(ContenedorGenerico)`
    overflow-y: scroll;
    display: flex;
    padding: 40px 0;
    height: 100dvh;
    width: 100%;
    justify-content: flex-start;
`

export const SeccionHabilidades = () => {
    return(
        <ContenedorSeccionHabilidades id="tecnologias">
            <SeccionHabilidadesUx />
        </ContenedorSeccionHabilidades>
    )
}
