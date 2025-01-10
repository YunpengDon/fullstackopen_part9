import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as Router, Route, Link, Routes, useMatch, PathMatch } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <App />
  </Router>
);
