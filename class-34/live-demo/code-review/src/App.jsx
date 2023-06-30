import React, { useContext } from 'react';

import Todo from './Components/Todo';
import Header from './Components/Header';
import Footer from './Components/Footer';
import SettingsForm from './Components/SettingsForm';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { When } from 'react-if';
import { AuthContext } from './Context/Auth';

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <Header />
        <When condition={isLoggedIn}>
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/settings" element={<SettingsForm />} />
          </Routes>
        </When>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
