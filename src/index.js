import React from 'react';
import ReactDOM from 'react-dom/client'; // Perhatikan perubahan ini untuk React 18
import App from './App';

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')); // Membuat root untuk merender aplikasi
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
