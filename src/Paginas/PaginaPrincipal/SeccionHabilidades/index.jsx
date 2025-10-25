import styled from "styled-components"
import { ContenedorGenerico } from "../../Display"
import { SeccionHabilidadesUx } from "./SeccionHabilidadesUX"
import { useContext } from "react"
import { ContextoGeneral } from "../ContextoGeneral"

const ContenedorSeccionHabilidades = styled(ContenedorGenerico)`
    overflow-y: scroll;
    display: flex;
    padding: 40px 0;
    height: 100dvh;
    width: 100%;
    justify-content: flex-start;

    /* Transición de fade */
    opacity: ${props => (props.activa ? 1 : 0)};
    pointer-events: ${props => (props.activa ? "auto" : "none")};
    background-color: black;
    transition: opacity .6s ease;
`

export const SeccionHabilidades = () => {
    const { seccionSeleccionada } = useContext(ContextoGeneral)

    return (
        <ContenedorSeccionHabilidades
            id="tecnologias"
            activa={seccionSeleccionada === "tecnologias"}
        >
            <SeccionHabilidadesUx />
        </ContenedorSeccionHabilidades>
    )
}
