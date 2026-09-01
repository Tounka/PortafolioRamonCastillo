import { createElement } from "react";
import { ContextoProviderGeneral } from "./ContextoGeneral.jsx";
import { NavegacionEspacial } from "./NavegacionEspacial.js";

export const PaginaPrincipal = () =>
  createElement(
    ContextoProviderGeneral,
    null,
    createElement(NavegacionEspacial),
  );
