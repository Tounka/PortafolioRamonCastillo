import styled from "styled-components";
import { DisplayPrincipal } from "../Display";
import { SeccionPrincipal } from "./SeccionPrincipal";
import {  SeccionContacto } from "./SeccionContacto";
import { SeccionLineaDeTiempo } from "./SeccionLineaTiempo";

import { useEffect } from "react";
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
        <DisplayPrincipal>
            
            <SeccionContacto />

            <ContenedorHorizontal>
                <SeccionPrincipal />
                <SeccionLineaDeTiempo />
            </ContenedorHorizontal>


        </DisplayPrincipal>
    )
}