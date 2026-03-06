import styled, { keyframes } from "styled-components";
import { TxtPrincipalStyled } from "../../../ComponentesGenerales/TxtPrincipal";
import { ImgPicture } from "../../Img";
import ReactDOM from 'react-dom';
import { ModalContext } from "./ContextoModal";
import { useContext, useEffect, useState } from "react";
import { ContextoGeneral } from "../ContextoGeneral";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(10px) scale(0.98); }
`;

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
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    
    animation: ${props => props.$isVisible ? fadeIn : fadeOut} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`
const TxtTitulo = styled(TxtPrincipalStyled)`
    color: var(--AmarilloEspecial);
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    padding: 10px;
    background-color: #000000e4;
    border-radius: 0 10px  0 0;
    

    @media (max-width: 600px) {
        font-size: 14px;
    }   
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
    background-color: #000000e4;
    border-radius: 0 0 20px 20px;
    padding: 10px;
`
const InteriorModal = styled.div`
    max-width: 800px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const Modal = () => {
    const { estadoModal, setEstadoModal, informacionModal } = useContext(ModalContext);
    const { setBoolSlider } = useContext(ContextoGeneral);
    const [render, setRender] = useState(estadoModal);

    useEffect(() => {
        if (estadoModal) setRender(true);
    }, [estadoModal]);

    const onAnimationEnd = () => {
        if (!estadoModal) setRender(false);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setEstadoModal(false);
                setBoolSlider(true);
            }
        };
        if (estadoModal) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [estadoModal, setEstadoModal, setBoolSlider]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setEstadoModal(false);
            setBoolSlider(true);
        }
    };

    return render ? (
        <ContenedorModal $isVisible={estadoModal} onClick={handleOverlayClick} onAnimationEnd={onAnimationEnd}>
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