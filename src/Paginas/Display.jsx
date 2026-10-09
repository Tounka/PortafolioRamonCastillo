import styled from "styled-components";

export const ContenedorPrincipal = styled.section`
    height: 100vh;
    height: 100dvh;
    width: 100%;
    max-width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;
    overflow: hidden;
`

export const ContenedorGenerico = styled(ContenedorPrincipal)`
    background-color: black;
`
