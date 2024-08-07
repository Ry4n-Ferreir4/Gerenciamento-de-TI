import React from 'react';
import ReactDOM from 'react-dom/client'; // Alteração aqui
import App from './App';
import './index.css'; // Certifique-se de que seu CSS está sendo importado

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
