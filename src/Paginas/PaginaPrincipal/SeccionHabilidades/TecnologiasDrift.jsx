import { useContext, useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { ContextoGeneral } from "../ContextoGeneral";
import DriftWall from "./DriftWall";
import "./TecnologiasDrift.css";
import html5 from "../../../Img/Tecnologias/logos/html5.svg";
import css3 from "../../../Img/Tecnologias/logos/css3.svg";
import javascript from "../../../Img/Tecnologias/logos/javascript.svg";
import react from "../../../Img/Tecnologias/logos/react.svg";
import wordpress from "../../../Img/Tecnologias/logos/wordpress.svg";
import shopify from "../../../Img/Tecnologias/logos/shopify.svg";
import woocommerce from "../../../Img/Tecnologias/logos/woocommerce.svg";
import styledcomponents from "../../../Img/Tecnologias/logos/styledcomponents.svg";
import nodejs from "../../../Img/Tecnologias/logos/nodejs.svg";
import nextjs from "../../../Img/Tecnologias/logos/nextjs.svg";
import python from "../../../Img/Tecnologias/logos/python.svg";
import postgresql from "../../../Img/Tecnologias/logos/postgresql.svg";
import firebase from "../../../Img/Tecnologias/logos/firebase.svg";
import supabase from "../../../Img/Tecnologias/logos/supabase.svg";
import github from "../../../Img/Tecnologias/logos/github.svg";
import googlecloud from "../../../Img/Tecnologias/logos/googlecloud.svg";
import stripe from "../../../Img/Tecnologias/logos/stripe.svg";

const tecnologias = [
  { title: "HTML5", image: html5, description: "Estructura semántica y accesible para interfaces web." },
  { title: "CSS3", image: css3, description: "Estilos responsivos, layouts y microinteracciones visuales." },
  { title: "JavaScript", image: javascript, description: "Lógica interactiva y comportamiento dinámico en el navegador." },
  { title: "React", image: react, description: "Interfaces componibles construidas con componentes reutilizables." },
  { title: "WordPress", image: wordpress, description: "Sitios administrables y experiencias editoriales personalizadas." },
  { title: "Shopify", image: shopify, description: "Tiendas online configuradas para vender con flexibilidad." },
  { title: "WooCommerce", image: woocommerce, description: "Comercio electrónico integrado dentro de WordPress." },
  { title: "Styled Components", image: styledcomponents, description: "Estilos encapsulados y mantenibles directamente en React." },
  { title: "Node", image: nodejs, description: "Servicios backend y APIs rápidas con JavaScript." },
  { title: "Next", image: nextjs, description: "Aplicaciones React con rendimiento, rutas y renderizado híbrido." },
  { title: "Python", image: python, description: "Automatización, lógica de servidor y herramientas de datos." },
  { title: "PostgreSQL", image: postgresql, description: "Base de datos relacional robusta para información crítica." },
  { title: "Firebase", image: firebase, description: "Autenticación, datos y servicios cloud para productos web." },
  { title: "Supabase", image: supabase, description: "Backend abierto con PostgreSQL, auth y tiempo real." },
  { title: "GitHub", image: github, description: "Control de versiones, colaboración y despliegues de código." },
  { title: "GCP", image: googlecloud, description: "Infraestructura cloud escalable para aplicaciones y servicios." },
  { title: "Stripe", image: stripe, description: "Pagos online seguros integrados al producto." }
];

export const TecnologiasDrift = () => {
  const { setSeccionSeleccionada } = useContext(ContextoGeneral);
  const [esMovil, setEsMovil] = useState(() => (
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  ));

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const actualizarViewport = () => setEsMovil(mediaQuery.matches);

    actualizarViewport();
    mediaQuery.addEventListener("change", actualizarViewport);
    return () => mediaQuery.removeEventListener("change", actualizarViewport);
  }, []);

  const regresar = () => {
    setSeccionSeleccionada("main");
    document.getElementById("main")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="tecnologias-drift">
      <div className="tecnologias-drift__wall">
        <DriftWall
          items={tecnologias}
          columns={esMovil ? 3 : 5}
          tileWidth={esMovil ? 142 : 168}
          tileHeight={esMovil ? 96 : 112}
          gap={esMovil ? 10 : 14}
          radius={14}
          perspective={1000}
          speed={esMovil ? 30 : 34}
          direction="up"
          variance={0.32}
          pauseOnHover={true}
          lift={42}
          fade={0.2}
          dim={0.9}
          overlayColor="#000000"
          respectReducedMotion={false}
        />
      </div>

      <button className="tecnologias-drift__return" type="button" onClick={regresar} aria-label="Ir a la sección principal">
        <FaAngleRight aria-hidden="true" />
      </button>
    </section>
  );
};






