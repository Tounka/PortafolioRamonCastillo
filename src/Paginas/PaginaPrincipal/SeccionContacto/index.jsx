import styled from "styled-components"
import { ContenedorGenerico } from "../../Display"
import { PaginaContactoUx } from "./PaginaContactoUx"
import { useContext } from "react"
import { ContextoGeneral } from "../ContextoGeneral"

const ContenedorContacto = styled(ContenedorGenerico)`
    margin-left: 100%;
    margin-left: 100dvw;
    height: 100dvh;


     opacity: ${props => (props.activa ? 1 : 0)};
    pointer-events: ${props => (props.activa ? "auto" : "none")};
    background-color: black;
    transition: opacity .6s ease;
`

export const SeccionContacto = () => {
    const { seccionSeleccionada } = useContext(ContextoGeneral)

    return (
        <ContenedorContacto
            id="Contacto"
            activa={seccionSeleccionada === "Contacto"}
        >
            <PaginaContactoUx />
        </ContenedorContacto>
    )
}
