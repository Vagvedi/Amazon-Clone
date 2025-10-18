import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import { StateProvider } from './context/StateContext';
import { initialState, reducer } from './StateProvider';
import './App.css';

function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {/* Add basename so GitHub Pages works */}
      <Router basename={process.env.PUBLIC_URL}>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<h1>Login Page</h1>} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
