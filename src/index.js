import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './App.js';
import './assets/react-toolbox/theme.css';
import theme from './assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import { Provider } from 'react-redux';
import store from './store/store.js';


const baseComponent  = (
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </ThemeProvider>
);

ReactDOM.render(baseComponent, document.getElementById('root'));
registerServiceWorker();
