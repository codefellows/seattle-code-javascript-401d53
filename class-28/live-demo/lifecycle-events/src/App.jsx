import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Content from './Components/Content';

function App() {
  const [name, setName] = useState('World');
  const [data, setData] = useState([]);
  const [showContent, setShowContent] = useState(false);

  // greedy effect - occurs EVERY time an event occurs
  // take a callback as an argument
  useEffect(() => {
    console.log('An Event Occurred');
  });

  // trigger an event when state "name" is changed
  // takes a callback AND an array with the state variable we want to monitor.  i.e. name
  useEffect(() => {
    console.log('Name State Was Changed');
  }, [name]);

  // trigger an event ONCE on component mount
  // takes a callback AND an empty array
  useEffect(() => {
    console.log('component mounted ONCE!!!!');
    async function getData() {
      let response = await axios.get('https://pokeapi.co/api/v2/pokemon');
      setData(response.data.results);
    }
    getData();
  }, []);

  return (
    <>
      <h1>Hello {name}</h1>
      <button onClick={() => setName('All')}>Change Greeting</button>
      <button onClick={() => setName('401d53')}>Change Greeting Again</button>
      <button onClick={() => setShowContent(!showContent)}>Show Content</button>
    {showContent && <Content />}

      <ul>
        {
          data.length ?
          data.map((pokemon, index) => (
            <li key={`app-li-${index}`}>{pokemon.name}</li>
          )) : ''
        }
      </ul>

    </>
  );
}

export default App;
