import { useContext } from 'react';
import './App.css';
import Main from './Components/Main';
import { SettingsContext } from './Context/Settings';

function App() {
  // utilize useContext hook
  // extract title and email from SettingsContext
  const { title, email } = useContext(SettingsContext);
  return (
    <>
      <h1>{title}</h1>
      <h4>email us at {email}</h4>
      <Main />
    </>
  );
}

export default App;
