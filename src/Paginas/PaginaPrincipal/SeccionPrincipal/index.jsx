import styled from "styled-components"
import { SeccionPrincipalUx } from "./SeccionPrincipalUx"
import { ContenedorPrincipal } from "../../Display"
import { useContext } from "react"
import { ContextoGeneral } from "../ContextoGeneral"

const ContenedorSeccionPrincipal = styled(ContenedorPrincipal)`
  position: relative;
  opacity: ${props => (props.activa ? 1 : 0)};
  pointer-events: ${props => (props.activa ? "auto" : "none")};
  transition: opacity 0.6s ease;
  will-change: opacity;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none; /* no bloquear clicks */
    box-shadow: inset 0px 0px 65px 32px rgba(0,0,0,0.75);
    z-index: 2; /* encima del contenido */
  }
`


export const SeccionPrincipal = () => {
  const { seccionSeleccionada } = useContext(ContextoGeneral)

  return (
    <ContenedorSeccionPrincipal
      id="main"
      activa={seccionSeleccionada === "main"}
    >
      <SeccionPrincipalUx />
    </ContenedorSeccionPrincipal>
  )
}
