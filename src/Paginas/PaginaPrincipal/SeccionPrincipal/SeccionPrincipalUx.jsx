import { CuadradoContenedor } from "../Componentes";
import styled from "styled-components";
import { ImgPicture } from "../../Img";
import img from "../../../Img/bgPrincipal.jpg";
import imgWebp from "../../../Img/bgPrincipal.webp";
import retrato from "../../../Img/ramonPizarra.png";
import retratoWebp from "../../../Img/ramonPizarra.webp";
import FoldText from "../../../ComponentesGenerales/FoldText";
import { useTextoRotativo } from "../../../hooks/useTextoRotativo";
import ClickSpark from "../../../ComponentesGenerales/ClickSpark";

const ContenedorPrincipal = styled.div`
  --yellow: #fcb71c;
  --yellow-light: #ffe08a;
  --white: #fffaf0;

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
`;

const Escenario = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1560px;
  margin: 0 auto;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  grid-template-areas: "izquierda retrato";
  align-items: center;
  column-gap: clamp(1.5rem, 4vw, 4rem);
  padding: clamp(1rem, 2vh, 2rem) clamp(1.5rem, 4vw, 4rem) 0;

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
    column-gap: clamp(0.25rem, 1vw, 1rem);
    padding: clamp(0.5rem, 1.5vh, 1.5rem) 0 0 clamp(0.75rem, 2vw, 1.5rem);
    overflow: hidden;
  }

  @media (max-width: 680px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: clamp(0.75rem, 1.5vh, 1.5rem) 1rem;
    overflow: hidden;
  }
`;

const ColumnaIzquierda = styled.div`
  grid-area: izquierda;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  min-height: 0;
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    align-items: flex-end;
    padding-right: clamp(0px, 1vw, 8px);
  }

  @media (max-width: 680px) {
    align-items: center;
    width: 100%;
    height: auto;
    padding: 0;
  }
`;

/* Agrupa título y menú en el mismo contenedor fijando el ancho al menú para que NUNCA cambie de posición */
const ContenedorMenuYTitulo = styled.div`
  --controlador-size: min(460px, 44vw, 62vmin);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  width: var(--controlador-size);
  max-width: 100%;

  @media (max-width: 1024px) {
    --controlador-size: min(370px, 44vw, 48vmin);
  }

  @media (max-width: 680px) {
    --controlador-size: min(340px, 82vw, 42vh);
  }
`;

const BloqueTitulo = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: clamp(3.2rem, 7vh, 5.2rem);
  text-align: center;
  user-select: none;
  pointer-events: none;
  margin-bottom: clamp(0.35rem, 1.4vh, 1rem);
  overflow: visible;

  h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    margin: 0;
    padding: 0;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
  }

  .fold-text {
    font-family: "Paytone One", sans-serif;
    line-height: 1;
    letter-spacing: clamp(.05em, .4vw, .18em);
    text-align: center;
    white-space: nowrap;
  }

  @media (max-width: 1024px) {
    height: clamp(2.8rem, 6vh, 4.4rem);
    margin-bottom: clamp(0.25rem, 1vh, 0.75rem);

    .fold-text {
      letter-spacing: clamp(.04em, .3vw, .12em);
    }
  }

  @media (max-width: 680px) {
    height: clamp(2.4rem, 5vh, 3.8rem);
    margin-bottom: clamp(0.2rem, 0.8vh, 0.5rem);

    .fold-text {
      letter-spacing: clamp(.03em, .25vw, .08em);
    }
  }
`;

const BloqueMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 0;
  position: relative;
`;

const BloqueRetrato = styled.figure`
  grid-area: retrato;
  position: relative;
  margin: 0;
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding-left: clamp(0px, 2vw, 24px);
  pointer-events: none;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 45%;
    transform: translateX(-50%);
    width: min(85%, 440px);
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      rgba(252, 183, 28, .18),
      transparent 68%
    );
    filter: blur(8px);
  }

  picture {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    max-height: 100%;
    min-height: 0;
  }

  img {
    position: relative;
    display: block;
    max-height: min(82vh, 82dvh, 860px);
    width: auto;
    max-width: min(100%, 640px);
    object-fit: contain;
    object-position: bottom left;
    filter: drop-shadow(0 18px 38px rgba(0, 0, 0, .65));
  }

  @media (min-width: 1600px) {
    img {
      max-height: min(84vh, 84dvh, 920px);
      max-width: min(100%, 700px);
    }
  }

  @media (max-width: 1024px) {
    padding-left: 0;
    justify-content: flex-end;
    overflow: hidden;

    &::before {
      width: min(90%, 460px);
      left: 60%;
    }

    picture {
      justify-content: flex-end;
      width: 100%;
      overflow: hidden;
    }

    img {
      max-height: min(84vh, 84dvh, 840px);
      width: auto;
      max-width: none;
      object-fit: contain;
      object-position: bottom right;
      transform: translateX(12%);
      filter: drop-shadow(0 16px 32px rgba(0, 0, 0, .75));
    }
  }

  @media (max-width: 680px) {
    display: none !important;
  }
`;

const TEXTOS_TITULO = ["PORTAFOLIO", "RAMÓN CASTILLO"];
const INTERVALO_TITULO = 30000;

export const SeccionPrincipalUx = () => {
  const { texto, fase, alTerminarSalida } = useTextoRotativo(
    TEXTOS_TITULO,
    INTERVALO_TITULO
  );

  return (
    <ClickSpark
      sparkColor="#fcb71c"
      sparkSize={12}
      sparkRadius={22}
      sparkCount={8}
      duration={420}
      extraScale={1.1}
    >
      <ContenedorPrincipal>
        <ImgPicture
          src={img}
          srcWebp={imgWebp}
          bg={true}
          alt="Imagen de fondo principal"
        />

        <Escenario>
          <ColumnaIzquierda>
            <ContenedorMenuYTitulo>
              <BloqueTitulo>
                <h1>
                  <FoldText
                    key={texto}
                    text={texto}
                    phase={fase}
                    onExitComplete={alTerminarSalida}
                    splitBy="char"
                    hinge="top"
                    trigger="mount"
                    duration={0.65}
                    stagger={0.045}
                    ease="power3.out"
                    perspective={700}
                    creaseShading={0.55}
                    fontSize="clamp(1.4rem, 4.8vw, 4.2rem)"
                    fontWeight={400}
                    color="#fffaf0"
                  />
                </h1>
              </BloqueTitulo>

              <BloqueMenu>
                <CuadradoContenedor />
              </BloqueMenu>
            </ContenedorMenuYTitulo>
          </ColumnaIzquierda>

          <BloqueRetrato>
            <picture>
              <source srcSet={retratoWebp} type="image/webp" />
              <img
                src={retrato}
                alt="Ramón Castillo con pizarra de Ingeniería en Software"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </BloqueRetrato>
        </Escenario>
      </ContenedorPrincipal>
    </ClickSpark>
  );
};
