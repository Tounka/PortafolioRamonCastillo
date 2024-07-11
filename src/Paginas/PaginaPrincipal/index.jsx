import styled from "styled-components";
import { DisplayPrincipal } from "../Display";
import { SeccionPrincipal } from "./SeccionPrincipal";
import {  SeccionContacto } from "./SeccionContacto";
import { SeccionLineaDeTiempo } from "./SeccionLineaTiempo";

import { useEffect } from "react";
import { ContextoProviderGeneral } from "./ContextoGeneral";
const ContenedorHorizontal = styled.div`
    display: flex;
    overflow: hidden;

    width: calc(100%* 2);

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
                    <SeccionPrincipal />
                    <SeccionLineaDeTiempo />
                </ContenedorHorizontal>


            </DisplayPrincipal>
        </ContextoProviderGeneral>

    )
}