import styled from "styled-components"
import { TxtPrincipal } from "../../../ComponentesGenerales/TxtPrincipal"

import { FaCss3Alt, FaHtml5,FaReact ,FaGithub, FaBootstrap} from "react-icons/fa";
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

const CardStyled = ({bgColor, icon, caso }) => {
    return(
        <CardIconoStyled bgColor={bgColor} caso={caso}>
            {icon}
        </CardIconoStyled>
    )   
}


export const SeccionHabilidadesUx = () => {
    return(
    <>
        <ContenedorSeccionStyled>
            <TxtPrincipal color='white' txt='FrontEnd' />

            <ContenedorCardStyled>
             <CardStyled bgColor={'#FC490B'} icon={<FaHtml5 />} />
             <CardStyled bgColor={'#264DE4'} icon={<FaCss3Alt />} />
             <CardStyled bgColor={'#F0DB4F'} caso='js' icon={<IoLogoJavascript />} />
             <CardStyled bgColor={'#262626'} caso='react' icon={<FaReact />} />
             <CardStyled bgColor={'#ffffff'} caso='bootstrap' icon={<FaBootstrap />} />
             <CardStyled bgColor={'#5b5b5b'} icon={<SiStyledcomponents />} />
            </ContenedorCardStyled>

            <TxtPrincipal color='white' txt='BackEnd' />

                <ContenedorCardStyled>

                <CardStyled bgColor={'#4F5B93'} icon={<FaPhp />} />
                <CardStyled bgColor={'#366693'} icon={<BiLogoPostgresql />} />
                <CardStyled bgColor={'#F58917'}  icon={<RiFirebaseFill />} />
                <CardStyled bgColor={'#3ECF8E'}  icon={<RiSupabaseFill />} />

                </ContenedorCardStyled>

            <TxtPrincipal color='white' txt='Otro' />

                <ContenedorCardStyled>
                <CardStyled bgColor={'#4F5B93'} icon={<FaGithub />} />
             

                </ContenedorCardStyled>
        </ContenedorSeccionStyled>

    </>
    )
}
