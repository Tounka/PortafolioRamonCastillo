import { ContextoProviderGeneral } from "./ContextoGeneral";
import { NavegacionEspacial } from "./NavegacionEspacial";

export const PaginaPrincipal = () => (
  <ContextoProviderGeneral>
    <NavegacionEspacial />
  </ContextoProviderGeneral>
);
