import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Welcome from '.';

describe('Welcome component', () => {
  test('loads and displays initial state', () => {
    render(<Welcome />);

    const h1 = screen.getByTestId('welcome-h1');
    expect(h1).toHaveTextContent('Welcome World');
  });
  test('changes state as expected', () => {
    render(<Welcome />);

    let input = screen.getByTestId('welcome-input');
    // we need to fire off a change event and change the 
    fireEvent.change(input, {target: {value: 'Tester'}});
    const h1 = screen.getByTestId('welcome-h1');
    expect(h1).toHaveTextContent('Welcome Tester');
  })
})
