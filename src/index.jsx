import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './Templates/App/index';
import reportWebVitals from './reportWebVitals';
import { Abc } from './Templates/Abc';
import { Menu } from '../src/Components/Menu/index'
import { PageNotFound } from './Templates/PageNotFound';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Menu />
      <Routes>
        <Route path="/abc" element={<Abc />}/>
        <Route path="/" element={<App />}/>
        <Route path="*" element={<PageNotFound />}/>
        {/* <App /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
