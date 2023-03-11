import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import ContextProviders from "./context";


const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(
    <BrowserRouter>
        <ContextProviders>
            <App />
        </ContextProviders>
    </BrowserRouter>
)