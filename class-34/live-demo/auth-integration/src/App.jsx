import { useContext } from 'react';
import './App.css';
import Main from './Components/Main';
import { SettingsContext } from './Context/Settings';
import Header from './Components/Header';
import Auth from './Components/Auth';

function App() {
  // utilize useContext hook
  // extract title and email from SettingsContext
  const { title, email } = useContext(SettingsContext);
  return (
    <>
      <Header />
      {/* <Main /> */}
      <Auth capability="read">
        <p>I can read!</p>
        <Main />
      </Auth>
      <Auth capability="create">
        <p>I can create!</p>
      </Auth>
      <Auth capability="update">
        <p>I can update!</p>
      </Auth>
      <Auth capability="delete">
        <p>I can delete!</p>
      </Auth>

    </>
  );
}

export default App;
