import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Gallery from './components/Gallery';

/*if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}*/

const root = document.getElementById('root');
const rootElement = ReactDOM.createRoot(root);

rootElement.render(
  <React.StrictMode>
    <Gallery />
  </React.StrictMode>
);

//ReactDOM.render(<Gallery />, document.getElementById('root'));