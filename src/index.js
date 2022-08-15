import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { 
Route,
BrowserRouter as Router,
Routes
} from 'react-router-dom';
import { Home } from './pages/Home/index';
import { Game } from './pages/Game/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={ <Home/> } />
        <Route path="/level/:idLevel" element={ <Game/> } />
      </Routes>
    </div>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
