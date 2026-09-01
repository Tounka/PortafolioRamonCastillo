import styled from "styled-components";
import { ContenedorGenerico } from "../../Display";
import { TecnologiasDrift } from "./TecnologiasDrift";
import { useContext } from "react";
import { ContextoGeneral } from "../ContextoGeneral";

const ContenedorSeccionHabilidades = styled(ContenedorGenerico)`
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  padding: 0;
  height: 100dvh;
  min-height: 100dvh;
  width: 100%;
  justify-content: stretch;
  align-items: stretch;

  opacity: ${props => (props.activa ? 1 : 0)};
  pointer-events: ${props => (props.activa ? "auto" : "none")};
  background-color: black;
  transition: opacity .6s ease;
`;

export const SeccionHabilidades = () => {
  const { seccionSeleccionada } = useContext(ContextoGeneral);

  return (
    <ContenedorSeccionHabilidades
      id="tecnologias"
      activa={seccionSeleccionada === "tecnologias"}
    >
      <TecnologiasDrift />
    </ContenedorSeccionHabilidades>
  );
};
