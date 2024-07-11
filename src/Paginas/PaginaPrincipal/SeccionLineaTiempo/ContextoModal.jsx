import React, { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [estadoModal, setEstadoModal] = useState(false);

  const [informacionModal, setInformacionModal] = useState({
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-jor4MRYg8l38d_rJocGsiXoBygToYlSoM-7BNkxd4lNVK-f5CxlBbO3T9BFokPhKGiw5kM0GBwKw2TKbSnwggykF5hIPY3eLRtVdNS0',
    titulo: 'soy un titulo',
    fecha: '07/07/2003',
    descripcion: 'soy una descripcion'
  });
  return (
    <ModalContext.Provider value={{ estadoModal, setEstadoModal, informacionModal, setInformacionModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, ModalContext };