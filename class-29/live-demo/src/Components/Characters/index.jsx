import { useReducer, useState } from 'react';

export const initialState = {
  title: 'Sesame Street Characters',
  characters: ['Big Bird', 'Elmo'],
};

// example action:
// {
//   type: 'REMOVE',
//   payload: 'Cookie Monster',
// }

export const characterReducer = (state=initialState, action) => {
  switch(action.type){
    case 'ADD':
      return {...state, characters: [...state.characters, action.payload]};
    case 'REMOVE':
      return {...state, characters: state.characters.filter(character => character !== action.payload)}
    default:
      return state;
  }
};

function Characters(){
  // const [title, setTitle] = useState('Sesame Street Characters');
  // const [characters, setCharacters] = useState(['Big Bird', 'Elmo']);
  const [input, setInput] = useState('');
  // employ the useReducer Hook
  const [state, dispatch] = useReducer(characterReducer, initialState)

  const addCharacter = () => {
    let action = {
      type: 'ADD',
      payload: input,
    };
    dispatch(action)
  }

  const removeCharacter = () => {
    let action = {
      type: 'REMOVE',
      payload: input,
    };
    dispatch(action)
  }

  return(
    <>
      <h1>{state.title}</h1>
      <input onChange={(e) => {setInput(e.target.value)}} />
      <button onClick={addCharacter}>Add Character</button>
      <button onClick={removeCharacter}>Remove Character</button>

      <ul>
        {
          state.characters.map((character, idx) => (
            <li key={`characters-${idx}`}>{character}</li>
          ))
        }
      </ul>
    </>
  )
}

export default Characters;
