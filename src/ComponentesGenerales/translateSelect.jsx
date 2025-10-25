import React from "react";

export const TranslateSelect = () => {
const handleChange = (e) => {
  const select = document.querySelector(".goog-te-combo");
  if (select) {
    if (e.target.value === "es") {
      // Resetea a idioma original
      select.value = "";
    } else {
      select.value = e.target.value;
    }
    select.dispatchEvent(new Event("change"));
  }
};


  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        background: "white",
        padding: "6px 10px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        zIndex: 9999,
      }}
    >
      <select onChange={handleChange} defaultValue="">
        <option value="">Seleccionar idioma</option>
        <option value="es">Español</option>
        <option value="en">Inglés</option>
        <option value="fr">Francés</option>
        <option value="de">Alemán</option>
        <option value="it">Italiano</option>
        <option value="pt">Portugués</option>
        <option value="ja">Japonés</option>
        <option value="zh-CN">Chino</option>
      </select>
    </div>
  );
};
