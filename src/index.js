import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);

/*root.render(
  React.createElement(
    'button',
    {disabled:false,onClick:()=>console.log('Click!')},
    'Click me')
)*/
