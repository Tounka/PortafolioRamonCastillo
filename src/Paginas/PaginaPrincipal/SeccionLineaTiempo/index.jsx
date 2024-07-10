
import styled from "styled-components"
import { Modal } from "./ModalPointTime"
import { ContenedorPrincipal } from "../../Display"
import {SeccionLineaDeTiempoUx} from './SeccionLineaTiempoUx'
import ReactDOM from 'react-dom';
import { ModalProvider } from "./ContextoModal";
const ContenedorLineaDeTiempo = styled(ContenedorPrincipal)`
    overflow: auto;
    align-items: baseline;
    background-color: black;
 
`

export const SeccionLineaDeTiempo = () =>{
    return(
        <ModalProvider>
                <ContenedorLineaDeTiempo id="timeline">
            
                <SeccionLineaDeTiempoUx />
                {ReactDOM.createPortal(
                    <Modal />,
                    document.getElementById('modalPortal')
                )}
            </ContenedorLineaDeTiempo>
        </ModalProvider>

    )
}