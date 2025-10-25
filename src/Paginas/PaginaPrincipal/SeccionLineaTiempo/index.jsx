import styled from "styled-components"
import { Modal } from "./ModalPointTime"
import { ContenedorPrincipal } from "../../Display"
import { SeccionLineaDeTiempoUx } from './SeccionLineaTiempoUx'
import { useContext } from "react"
import ReactDOM from 'react-dom';
import { ModalProvider } from "./ContextoModal";
import { ContextoGeneral } from "../ContextoGeneral";

const ContenedorLineaDeTiempo = styled(ContenedorPrincipal)`
    overflow: hidden;
    height: 100dvh;
    align-items: baseline;
    background-color: black;

     opacity: ${props => (props.activa ? 1 : 0)};
    pointer-events: ${props => (props.activa ? "auto" : "none")};
    background-color: black;
     transition: opacity .6s ease;
`

export const SeccionLineaDeTiempo = () => {
    const { seccionSeleccionada } = useContext(ContextoGeneral)

    return (
        <ModalProvider>
            <ContenedorLineaDeTiempo
                id="timeline"
                activa={seccionSeleccionada === "timeline"}
            >
                <SeccionLineaDeTiempoUx />
                {ReactDOM.createPortal(
                    <Modal />,
                    document.getElementById('modalPortal')
                )}
            </ContenedorLineaDeTiempo>
        </ModalProvider>
    )
}
