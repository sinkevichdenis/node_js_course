import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import './App.css';

export const App = () => {
    const routes = useRoutes();
    return (
        <div className="container">
            <BrowserRouter>
                {routes}
            </BrowserRouter>
            <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore}/>
        </div>
    )
};

