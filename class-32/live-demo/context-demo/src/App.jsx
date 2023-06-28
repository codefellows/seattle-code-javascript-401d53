import { useContext } from 'react';
import './App.css';
import Main from './Components/Main';
import { SettingsContext } from './Context/Settings';
import Header from './Components/Header';

function App() {
  // utilize useContext hook
  // extract title and email from SettingsContext
  const { title, email } = useContext(SettingsContext);
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
