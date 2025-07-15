import styled from "styled-components";
import { DisplayPrincipal } from "../Display";
import { SeccionPrincipal } from "./SeccionPrincipal";
import {  SeccionContacto } from "./SeccionContacto";
import { SeccionLineaDeTiempo } from "./SeccionLineaTiempo";
import { SeccionHabilidades } from "./SeccionHabilidades";
import { useEffect } from "react";
import { ContextoProviderGeneral } from "./ContextoGeneral";
import { SeccionProyectosV2 } from "./SeccionProyectosV2";
const ContenedorHorizontal = styled.div`
    display: flex;
    overflow: hidden;

    width: calc(100%* 3);

`
export const PaginaPrincipal = () =>{
    useEffect(() => {
        const middleSection = document.getElementById('main');
        if (middleSection) {
            middleSection.scrollIntoView({ });
        }
    }, []);
    
    return(
        <ContextoProviderGeneral>
            <DisplayPrincipal>
               
                <SeccionContacto />

                <ContenedorHorizontal>
                    <SeccionHabilidades />
                    <SeccionPrincipal />
                    <SeccionLineaDeTiempo />
                </ContenedorHorizontal>

                <SeccionProyectosV2 />

            </DisplayPrincipal>
        </ContextoProviderGeneral>

    )
}