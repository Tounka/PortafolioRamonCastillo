import styled from "styled-components";
import { ImgPicture } from "../../Img";
import { TxtPrincipal, TxtGenerico } from "../../../ComponentesGenerales/TxtPrincipal";
import { FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaPhp, FaGithub, FaWordpress } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io';
import { SiStyledcomponents } from 'react-icons/si';
import { BiLogoPostgresql } from 'react-icons/bi';
import { RiFirebaseFill, RiSupabaseFill } from 'react-icons/ri';
import { TxtGenericoStyled } from "../../../ComponentesGenerales/TxtPrincipal";

const tecnologiaMap = {
    html: { icon: <FaHtml5 />, bgColor: '#FC490B' ,color: 'white' },
    css: { icon: <FaCss3Alt />, bgColor: '#264DE4', color: 'white'},
    js: { icon: <IoLogoJavascript />, bgColor: '#F0DB4F' },
    react: { icon: <FaReact />, bgColor: '#262626', color: '#02DCFF' },
    bootstrap: { icon: <FaBootstrap />, bgColor: '#ffffff', color: '#8411F6' },
    wordpress: { icon: <FaWordpress />, bgColor: '#ffffff', color: '#00749A' },
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
const ContenedorInternoIconos = styled.div`
    display: flex;
    width: auto; 
    gap: 10px; 
    flex-wrap: nowrap; 
    justify-content: center;

    align-items: center;
    scrollbar-width: none; 
    -ms-overflow-style: none;  
    &::-webkit-scrollbar {
        display: none; 
    }


`;
const ContenedorIcono = styled.div`
 
    font-size: 30px;
    background-color: ${props => props.bgColor ? props.bgColor : ''};
    color: ${props => props.color ? props.color : ''};
    display: flex;
    justify-content:center;
    align-items:center;
    border-radius: 10px;
    flex-shrink: 0;
    padding: 4px;

    @media (max-width: 850px) {

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


const Iconos = ({tecnologias}) =>{
    
    return(
        <ContenedorIconos >
            <ContenedorInternoIconos>
                {tecnologias.map((tecnologia, index) =>(
                    <Icono key={`tecnologia${index}`} tecnologia={tecnologia}  />
                ))}
            </ContenedorInternoIconos>
        </ContenedorIconos>
    )
}


const CardProyectoStyled = styled.div`
    width: 100%;
    height: auto;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    user-select: none;
    @media (max-width: 600px) {
        max-height: 600px;
    }
    
`
const ContenedorImgStyled = styled.div`
        width: 100%;
        height: 100%;
        transition: transform .3s;
        :hover{
            transition: transform .3s;
            img{
                transform: scale(1.05);
             
            }
            
        }
       
        img{
            object-fit: center;
            width: 100%;
            height: 100%;

        }
`
const ContenedorTxtStyled = styled.div`
    opacity: 0;
    transition: .2s;
    &:hover{
        opacity: 1;
        transition: .2s;
        
    }
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 5px;
    
    background-color: #000000b2;
`

const TxtCardProyecto = styled(TxtGenericoStyled)`
    font-size: 24px;
    @media (max-width: 900px) {
        font-size: 18px;
    }
    @media (max-width: 400px) {
        font-size: 20px;
    }
    @media (max-width: 350px) {
        font-size: 16px;
    }
`
const ContenedorInternoTxt = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding:10px;
`
const TxtPrincipalCard = styled.p`
    margin: 0;
    line-height: 1;
    font-size: 36px;
    color: var(--AmarilloEspecial);
    text-shadow: 2px 2px 30px black;
    text-align: center;
    font-weight: bold;
    @media (max-width: 600px) {
        font-size: 28px;
    }
    @media (max-width: 450px) {
        font-size: 24px;
    }
    @media (max-width: 350px) {
        font-size: 20px;
    }
`
export const CardProyectoV2 = ({
    titulo = 'Soy un titulo',
    descripcionCorta = 'soy una pagina web que hace X cosas',
    tecnologias = ['react', 'js', 'html', 'css'],
    url,
    srcImg = 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000000964/a28a81253e919298beab2295e39a56b7a5140ef15abdb56135655e5c221b2a3a',
    srcImgWebp = 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000000964/a28a81253e919298beab2295e39a56b7a5140ef15abdb56135655e5c221b2a3a'},
    key

    ) =>{
        const handleClick = () => {
            window.open(url, '_blank'); // Abre el enlace en una nueva pestaña
          };
        return(
        <CardProyectoStyled key={key} onClick={() => handleClick()}>
            <ContenedorImgStyled>
                <ImgPicture src={srcImg} srcWebp={srcImgWebp} alt={'Imagen del sitio web ' + titulo} />
            </ContenedorImgStyled>
            <ContenedorTxtStyled>
                <ContenedorInternoTxt>
                    <TxtPrincipalCard >{titulo}</TxtPrincipalCard>
                    <TxtCardProyecto color='white' txt={descripcionCorta}  aling='left' size='20px'> {descripcionCorta} </TxtCardProyecto>
                    
                </ContenedorInternoTxt>
                <Iconos tecnologias={tecnologias} />
            </ContenedorTxtStyled>
        </CardProyectoStyled>
    )
}