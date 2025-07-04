import styled from "styled-components";
import { TxtPrincipalStyled } from "../../../ComponentesGenerales/TxtPrincipal";
import { ImgPicture } from "../../Img";
import ReactDOM from 'react-dom';
import { ModalContext } from "./ContextoModal";
import { useContext } from "react";
import { ContextoGeneral } from "../ContextoGeneral";

const ContenedorModal = styled.div`
    height: 100%;
    width: 100%;
    
    padding: 40px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    z-index: 1000;
    position: fixed;
    top:0;
    left: 0;
    background-color: #0000009d;
    backdrop-filter: blur(2px);

`
const TxtTitulo = styled(TxtPrincipalStyled)`
    color: var(--AmarilloEspecial);
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    padding: 10px;
    background-color: #000000e4;
    border-radius: 0 10px  0 0;
    
`
const TxtDescripcion = styled.p`
    margin: 0;
    font-size: 16px;
    color: white;
`
const TxtDescripcionFecha = styled(TxtDescripcion)`
    font-size: 24px;
    font-weight: bold;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.46);
    color: var(--AmarilloEspecial);

    text-align: center;
`
const ContenedorImg = styled.div`
    width: 100%;
    height: 600px;

    @media (max-width: 600px) {
        height: 400px;
    }
    position: relative;
    object-fit: contain;
    display: flex;
    justify-content:start;
    align-items:end;
`
const ContenedorBtn = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
const BtnCerrarModal = styled.button`
    border: none;
    border-radius: 10px;
    font-size: 24px;
    font-weight: bold;
    color: white;
    background-color: var(--RojoNegativo);

    height: 34px;
    width: 120px;
    cursor: pointer;

`
const ContenedorSegundaSeccion = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const InteriorModal = styled.div`
    max-width: 800px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const Modal = () => {
    const { estadoModal, setEstadoModal, informacionModal } = useContext(ModalContext);
    const { setBoolSlider } = useContext(ContextoGeneral);
    return estadoModal ? (
        <ContenedorModal>
            <InteriorModal>

                <ContenedorImg>
                    <ImgPicture bg src={informacionModal.img} alt={`Imagen principal del modal ${informacionModal.titulo}`} />
                    <TxtTitulo>{informacionModal.titulo}</TxtTitulo>
                </ContenedorImg>
                <ContenedorSegundaSeccion>
                    <div>
                        <TxtDescripcionFecha>{informacionModal.fecha}</TxtDescripcionFecha>
                        <TxtDescripcion>{informacionModal.descripcion}</TxtDescripcion>
                    </div>

                    <ContenedorBtn > <BtnCerrarModal onClick={() => { setEstadoModal(false); setBoolSlider(true); }}> Cerrar </BtnCerrarModal> </ContenedorBtn>
                </ContenedorSegundaSeccion>
            </InteriorModal>
        </ContenedorModal>
    ) : null;
};