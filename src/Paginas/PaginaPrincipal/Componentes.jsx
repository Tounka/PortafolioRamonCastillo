import styled from "styled-components";

const CuadradoContenedorStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;

    height: 350px;
    width: 350px;
    
    @media (max-width: 800px) {
        height: 300px;
        width: 300px;
    }
    @media (max-width: 600px) {
        height: 200px;
        width: 200px;
    }

    
    
    transform: rotate(45deg);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);


  
`
const BtnCuadrado = styled.button`
    border: none;
    height: 100%;
    width:100%;
    padding: 0;

    font-size: 22px;
    color: white;
    background-color: #00000063;

    border-left: ${props => props.noLeft ? null : 'solid white 2px'};
    border-top: ${props => props.noTop ? null : 'solid white 2px'};
    

    h1 {
        transform: rotate(-45deg);
        margin: 0;
    }

    cursor: pointer;
    transition: .1s ease-in;
    &:hover{
        background-color: #000000;
        transition: .1s ease-in;
    }
`

export const CuadradoContenedor = () => {
    const handleClick = (url) =>{
        const element = document.getElementById(url);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <CuadradoContenedorStyled>
            <BtnCuadrado noLeft noTop onClick={ () => handleClick('Contacto')}><h1>1</h1></BtnCuadrado>
            <BtnCuadrado noTop><h1>2</h1></BtnCuadrado>
            <BtnCuadrado noLeft><h1>3</h1></BtnCuadrado>
            <BtnCuadrado ><h1>4</h1></BtnCuadrado>
    
        </CuadradoContenedorStyled>
    );
}