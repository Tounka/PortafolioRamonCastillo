import styled from "styled-components"
import { TxtPrincipal } from "../../../ComponentesGenerales/TxtPrincipal"

import { FaCss3Alt, FaHtml5, FaReact, FaGithub, FaBootstrap, FaAngleRight } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { IoLogoJavascript } from "react-icons/io";
import { FaPhp } from "react-icons/fa";
import { RiSupabaseFill } from "react-icons/ri";
import { RiFirebaseFill } from "react-icons/ri";
import { SiStyledcomponents } from "react-icons/si";



const ContenedorSeccionStyled = styled.div`
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    max-width: 800px;
    gap: 20px;
    
`
const ContenedorCardStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    width: 100%;
    
    gap: 30px;
    
    @media (max-width: 400px){
        grid-template-columns: repeat(2, 1fr);
        width: 300px;
        gap: 10px;
    }

`
const CardIconoStyled = styled.div`
  position: relative;
    width: 150px;
    height: 150px;
    aspect-ratio: 1/1;
    background-color: ${props => props.bgColor ? props.bgColor : 'fff'};
    color: white;
    font-size: 100px;
    transition: font-size .2s;
        &:hover{
            font-size: 105px;
            transition: font-size .2s;
        }
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10%;
    overflow: hidden;

    ${(props) => props.caso === 'js' && `
    
    color: black;
    justify-content: flex-end; 
    align-items: flex-end; 
    padding: 10px;
  `}
      ${(props) => props.caso === 'bootstrap' && `
    
    color: #8411F6;

  `}
    ${(props) => props.caso === 'react' && `
    
    color: #02DCFF;

  `}
    @media (max-width: 550px){
        font-size: 80px;
        width: 100px;
        height: 100px;
        transition: font-size .2s;
        &:hover{
            font-size: 85px;
            transition: font-size .2s;
        }
    }
  & > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    
    align-items: center;
   
    
    
  }
 

`;

const ContenedorPadreIcono = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
const ContenedorCard = styled.div`
    display: grid;
    grid-template-rows: 150px 60px;
    @media (max-width: 550px){
        grid-template-rows: 100px 30px;
    }

    gap: 10px;
    align-items: center;
    color: white;
    
    gap: 10px;
`
const TextoCard = styled.p`
    width: 100%;
    margin: 0;
    text-align: center;
    line-height: 1.1;
    font-size: 18px;
    @media (max-width: 420px) {
        font-size: 12px;
    }
`

const CardStyled = ({ bgColor, icon, caso, nombreTecnologia = "Nombre" }) => {
    return (
        <ContenedorCard>
            <ContenedorPadreIcono>
                <CardIconoStyled bgColor={bgColor} caso={caso}>
                    {icon}
                </CardIconoStyled>
            </ContenedorPadreIcono>

            <TextoCard>{nombreTecnologia}</TextoCard>

        </ContenedorCard>
    )
}

const ContenedorInferiorBtnStyled = styled.button`
    border: none;
    background-color: var(--AmarilloEspecial);
    width: 100%;
    height:60px;

    border-radius: 15px;

`
const ContenedoroIcono = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    
    

    font-size: 42px;
    cursor: pointer;
    transition: width .2s ease-in-out;
    &:hover{
        width: 110%;
        transition: width .2s ease-in-out;
    }

`
const ContenedorInferiorBtn = () => {
    const handleClick = () => {
        const element = document.getElementById('main');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <ContenedorInferiorBtnStyled onClick={handleClick}>
            <ContenedoroIcono>
                <FaAngleRight />
            </ContenedoroIcono>

        </ContenedorInferiorBtnStyled>

    )
}

export const SeccionHabilidadesUx = () => {
    return (
        <>
            <ContenedorSeccionStyled>
                <TxtPrincipal color='white' txt='FrontEnd' />

                <ContenedorCardStyled>
                    <CardStyled bgColor={'#FC490B'} icon={<FaHtml5 />} nombreTecnologia="HTML5" />
                    <CardStyled bgColor={'#264DE4'} icon={<FaCss3Alt />} nombreTecnologia="CSS3" />
                    <CardStyled bgColor={'#F0DB4F'} caso='js' icon={<IoLogoJavascript />} nombreTecnologia="JavaScript" />
                    <CardStyled bgColor={'#262626'} caso='react' icon={<FaReact />} nombreTecnologia="React" />
                    <CardStyled bgColor={'#ffffff'} caso='bootstrap' icon={<FaBootstrap />} nombreTecnologia="Bootstrap" />
                    <CardStyled bgColor={'#5b5b5b'} icon={<SiStyledcomponents />} nombreTecnologia="Styled Components" />
                </ContenedorCardStyled>

                <TxtPrincipal color='white' txt='BackEnd' />

                <ContenedorCardStyled>
                    <CardStyled bgColor={'#4F5B93'} icon={<FaPhp />} nombreTecnologia="PHP" />
                    <CardStyled bgColor={'#366693'} icon={<BiLogoPostgresql />} nombreTecnologia="PostgreSQL" />
                    <CardStyled bgColor={'#F58917'} icon={<RiFirebaseFill />} nombreTecnologia="Firebase" />
                    <CardStyled bgColor={'#3ECF8E'} icon={<RiSupabaseFill />} nombreTecnologia="Supabase" />
                </ContenedorCardStyled>

                <TxtPrincipal color='white' txt='Otro' />

                <ContenedorCardStyled>
                    <CardStyled bgColor={'#4F5B93'} icon={<FaGithub />} nombreTecnologia="GitHub" />
                </ContenedorCardStyled>

                <ContenedorInferiorBtn />
            </ContenedorSeccionStyled>
        </>
    )
}

