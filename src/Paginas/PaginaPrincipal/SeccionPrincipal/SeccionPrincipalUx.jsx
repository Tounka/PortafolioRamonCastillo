import { CuadradoContenedor } from "../Componentes";
import styled from "styled-components";
import { ImgPicture } from "../../Img";
import img from "../../../Img/bgPrincipal.jpg";
import imgWebp from "../../../Img/bgPrincipal.webp";

const ContenedorPrincipal = styled.div`
  position: relative;
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
  background: #050608;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: rgba(3, 5, 8, .72);
  }

  &::after {
    content: "";
    position: absolute;
    inset: -8%;
    z-index: 2;
    pointer-events: none;
    background: radial-gradient(
      circle at center,
      rgba(255, 180, 0, .05),
      transparent 45%
    );
  }

  > div:first-child {
    width: 100%;
    height: 100%;
    z-index: 0 !important;
  }

  > div:last-child {
    position: relative;
    z-index: 3;
  }
`;

export const SeccionPrincipalUx = () => (
  <ContenedorPrincipal>
    <ImgPicture
      src={img}
      srcWebp={imgWebp}
      bg={true}
      alt="Imagen de fondo principal"
    />
    <CuadradoContenedor />
  </ContenedorPrincipal>
);
