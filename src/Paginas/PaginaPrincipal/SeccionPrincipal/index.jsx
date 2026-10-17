import styled from "styled-components"
import { SeccionPrincipalUx } from "./SeccionPrincipalUx"
import { ModalCursos } from "./ModalCursos"
import { ContenedorPrincipal } from "../../Display"
import { useCallback, useContext, useState } from "react"
import { ContextoGeneral } from "../ContextoGeneral"

const ContenedorSeccionPrincipal = styled(ContenedorPrincipal)`
  position: relative;
  opacity: ${props => (props.activa ? 1 : 0)};
  pointer-events: ${props => (props.activa ? "auto" : "none")};
  transition: opacity 0.6s ease;
  will-change: opacity;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none; /* no bloquear clicks */
    box-shadow: inset 0px 0px 65px 32px rgba(0,0,0,0.75);
    z-index: 2; /* encima del contenido */
  }
`

/* Va fuera de SeccionPrincipalUx para quedar por encima de la viñeta (::before) */
const BotonCursos = styled.button`
  position: absolute;
  top: clamp(14px, 3vh, 28px);
  right: clamp(14px, 3vw, 40px);
  z-index: 3;
  padding: 9px 20px;
  border: none;
  border-radius: 6px;
  background: var(--AmarilloEspecial);
  color: #111;
  font: 700 15px "Baloo 2", sans-serif;
  cursor: pointer;
  transition: background-color .15s ease;

  &:hover {
    background: #e5a50f;
  }

  &:focus-visible {
    outline: 2px solid #fffaf0;
    outline-offset: 3px;
  }

  @media (max-width: 680px) {
    padding: 7px 16px;
    font-size: 14px;
  }
`

export const SeccionPrincipal = () => {
  const { seccionSeleccionada } = useContext(ContextoGeneral)
  const [cursosAbiertos, setCursosAbiertos] = useState(false)
  const cerrarCursos = useCallback(() => setCursosAbiertos(false), [])

  return (
    <ContenedorSeccionPrincipal
      id="main"
      activa={seccionSeleccionada === "main"}
    >
      <SeccionPrincipalUx />
      <BotonCursos type="button" onClick={() => setCursosAbiertos(true)}>
        Ver cursos
      </BotonCursos>
      <ModalCursos abierto={cursosAbiertos} alCerrar={cerrarCursos} />
    </ContenedorSeccionPrincipal>
  )
}
