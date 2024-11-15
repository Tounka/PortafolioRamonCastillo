import styled from "styled-components";
import { ImgPicture } from "../../Img";
import { TxtPrincipal, TxtGenerico } from "../../../ComponentesGenerales/TxtPrincipal";
import { FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaPhp, FaGithub } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io';
import { SiStyledcomponents } from 'react-icons/si';
import { BiLogoPostgresql } from 'react-icons/bi';
import { RiFirebaseFill, RiSupabaseFill } from 'react-icons/ri';


const CardProyectoStyled = styled.div`
    height: auto;
    width: 100%;
    gap: 20px;
    display: grid;
    grid-template-columns: 266px auto;
    @media (max-width: 450px) {
        grid-template-columns: 133px auto;
       
        gap:10px;
    }
    cursor: pointer;

    background-color: white;
    border-radius: 10px;
    overflow: hidden;
`
const ContenedorSeccionProyecto = styled.div`
    width: 100%;
    height: 100%;
    display: flex;

    justify-content: ${props => props.position === 'right' ? 'right' : 'left'};
    align-items: start;
    flex-direction: column;
    
`
const SegundoContenedorSeccionProyecto = styled(ContenedorSeccionProyecto)`
    display: grid;
    grid-template-rows: auto auto 40px;
    gap: 10px;
    padding: 5px 10px;
    align-items: center;
    @media (max-width: 450px) {
        grid-template-rows: auto auto auto;
       
    }
    

    
    
`
const ContenedorImg = styled.div`
    width: 266px;
    height: 100%;
    @media (max-width: 450px) {
        width: 133px;
       
    }
`

const ContenedorIcono = styled.div`
    height: 40px;
    width: 40px;
    font-size: 30px;
    background-color: ${props => props.bgColor ? props.bgColor : ''};
    color: ${props => props.color ? props.color : ''};
    display: flex;
    justify-content:center;
    align-items:center;
    border-radius: 10px;
    flex-shrink: 0;
    @media (max-width: 450px) {
        height: 30px;
        width: 30px;
        font-size: 24px;
    }

    @media (max-width: 350px) {
        height: 25px;
        width: 25px;
        font-size: 20px;
    }
    
`
const tecnologiaMap = {
    html: { icon: <FaHtml5 />, bgColor: '#FC490B' ,color: 'white' },
    css: { icon: <FaCss3Alt />, bgColor: '#264DE4', color: 'white'},
    js: { icon: <IoLogoJavascript />, bgColor: '#F0DB4F' },
    react: { icon: <FaReact />, bgColor: '#262626', color: '#02DCFF' },
    bootstrap: { icon: <FaBootstrap />, bgColor: '#ffffff', color: '#8411F6' },
    styledcomponents: { icon: <SiStyledcomponents />, bgColor: '#5b5b5b' },
    php: { icon: <FaPhp />, bgColor: '#4F5B93' },
    postgresql: { icon: <BiLogoPostgresql />, bgColor: '#366693' },
    firebase: { icon: <RiFirebaseFill />, bgColor: '#F58917' },
    supabase: { icon: <RiSupabaseFill />, bgColor: '#3ECF8E' },
    github: { icon: <FaGithub />, bgColor: '#4F5B93' },
};
const Icono = ({tecnologia}) =>{
    const { icon, bgColor, color } = tecnologiaMap[tecnologia] || {};
    return(
        <ContenedorIcono bgColor={bgColor} color={color}>
            {icon}
        </ContenedorIcono>
    )
}
const TxtPrincipalCard = styled.p`
    margin: 0;
    font-size: 36px;
    color: black;
    text-align: left;
    font-weight: bold;
    @media (max-width: 450px) {
        font-size: 28px;
    }
    @media (max-width: 450px) {
        font-size: 24px;
    }
    @media (max-width: 350px) {
        font-size: 20px;
    }
`
const ContenedorIconos = styled.div`
    width: 100%; 
    display: flex;
    overflow-x: auto; 
    
`;

const ContenedorInternoIconos = styled.div`
    display: flex;
    width: auto; 
    gap: 10px; 
    flex-wrap: nowrap; 

    scrollbar-width: none; 
    -ms-overflow-style: none;  
    &::-webkit-scrollbar {
        display: none; 
    }

    @media (max-width: 350px) {
        gap: 5px; 
    }
`;
const Iconos = ({tecnologias}) =>{
    
    return(
        <ContenedorIconos >
            <ContenedorInternoIconos>
                {tecnologias.map(tecnologia =>(
                    <Icono tecnologia={tecnologia}  />
                ))}
            </ContenedorInternoIconos>
        </ContenedorIconos>
    )
}

export const CardProyecto = ({
    titulo = 'Soy un titulo',
    descripcionCorta = 'soy una pagina web que hace X cosas',
    tecnologias = ['react', 'js', 'html', 'css'],
    url,
    srcImg = 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000000964/a28a81253e919298beab2295e39a56b7a5140ef15abdb56135655e5c221b2a3a',
    srcImgWebp = 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000000964/a28a81253e919298beab2295e39a56b7a5140ef15abdb56135655e5c221b2a3a'}
   

    ) =>{
        const handleClick = () => {
            window.open(url, '_blank'); // Abre el enlace en una nueva pestaña
          };
        return(
        <CardProyectoStyled onClick={() => handleClick()}>
            <ContenedorSeccionProyecto>
                <ContenedorImg position = 'right'>
                    <ImgPicture alt={'Imagen del sitio web ' + titulo} src={srcImg} srcWebp = {srcImgWebp}  obPosition = 'top' />
                </ContenedorImg>
            </ContenedorSeccionProyecto>

            <SegundoContenedorSeccionProyecto>
                <TxtPrincipalCard >{titulo}</TxtPrincipalCard>
                <TxtGenerico txt={descripcionCorta}  aling='left' size='24px' txtProyectos />
                <Iconos tecnologias={tecnologias} />
            </SegundoContenedorSeccionProyecto>

        </CardProyectoStyled>
    )
}