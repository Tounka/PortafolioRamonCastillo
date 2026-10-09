import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import isPropValid from '@emotion/is-prop-valid'
import { StyleSheetManager } from 'styled-components'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyleSheetManager shouldForwardProp={isPropValid}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StyleSheetManager>
);
