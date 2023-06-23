import { initialState, characterReducer } from '.';

describe('Character Reducer', () => {
  it('displays initial state, adds, and removes', () => {
    let state = characterReducer(initialState, {});

    expect(state.title).toEqual('Sesame Street Characters');
    expect(state.characters).toEqual(['Big Bird', 'Elmo']);

    state = characterReducer(state, {type: 'ADD', payload: 'test'});
    expect(state.characters.includes('test')).toBeTruthy();
    expect(state.characters).toEqual(['Big Bird', 'Elmo', 'test']);

    state = characterReducer(state, {type: 'REMOVE', payload: 'test'});
    expect(state.characters.includes('test')).toBeFalsy();
    expect(state.characters).toEqual(['Big Bird', 'Elmo']);

  })
})
