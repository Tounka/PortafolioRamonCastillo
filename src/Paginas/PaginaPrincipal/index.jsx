import styled from "styled-components";
import { DisplayPrincipal } from "../Display";
import { SeccionPrincipal } from "./SeccionPrincipal";
import {  SeccionContacto } from "./SeccionContacto";

export const PaginaPrincipal = () =>{
    return(
        <DisplayPrincipal>
            <SeccionContacto />
            <SeccionPrincipal />
            
        </DisplayPrincipal>
    )
}