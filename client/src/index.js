import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import styles from './styles.module.css';
import App from './app'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <div className={styles.app}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </div>,
  document.getElementById('root')
);

registerServiceWorker();
