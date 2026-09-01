import { ContenedorPrincipal } from "../../Display"
import styled from "styled-components"
import { SeccionProyectosV2Ux } from "./ProyectosUxV2"
import { useContext } from "react"
import { ContextoGeneral } from "../ContextoGeneral"

const ContenedorSeccionProyectos = styled(ContenedorPrincipal)`
    margin-left: 100%;
    justify-content: start;
    box-sizing: border-box;
    padding: 30px 0;
    background-color: black;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior-y: contain;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-y;
    scrollbar-gutter: stable;
    min-height: 0;

      opacity: ${props => (props.activa ? 1 : 0)};
    pointer-events: ${props => (props.activa ? "auto" : "none")};
    background-color: black;
    transition: opacity .6s ease;
`

export const SeccionProyectosV2 = () => {
    const { seccionSeleccionada } = useContext(ContextoGeneral)

    return (
        <ContenedorSeccionProyectos
            id="proyectos"
            activa={seccionSeleccionada === "proyectos"}
        >
            <SeccionProyectosV2Ux />
        </ContenedorSeccionProyectos>
    )
}
