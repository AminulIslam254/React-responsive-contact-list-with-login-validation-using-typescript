import React from 'react';

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Home from './components/Home';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <>
       <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginForm/>} />
          </Routes>
          <Routes>
            <Route path='/home' element={<Home/>} />
          </Routes>
        </BrowserRouter>

    </>
  );
}

export default App;
