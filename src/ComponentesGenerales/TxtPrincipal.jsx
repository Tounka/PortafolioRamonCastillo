import styled from "styled-components"

export const TxtPrincipalStyled = styled.h3`
    margin: 0;
    font-size: ${props => props.size ? props.size : '36px'}; 
    color: ${props => props.color ? props.color : 'black'};
    text-align: center;

    ${props => props.subrayado ? `
        
        clip-path: polygon(0 0, 100% 0%, 90% 100%, 0% 100%);
        background-color: var(--AmarilloEspecial);
        padding: 0 30px 0 10px;
    ` : ''}
    ${props => props.mediaDismFontSize ? `
        @media (max-width: 400px){
            font-size: 28px;
        }
    ` : ''}
`;
export const TxtPrincipal = ({txt, size, subrayado, mediaDismFontSize, color}) =>{
    return(
        <TxtPrincipalStyled color={color} size={size} subrayado={subrayado} mediaDismFontSize={mediaDismFontSize}> {txt} </TxtPrincipalStyled>
    )
};
