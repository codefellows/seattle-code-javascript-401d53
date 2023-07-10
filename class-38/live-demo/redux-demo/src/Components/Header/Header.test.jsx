import { screen, render } from '@testing-library/react';
import Header from '.';


describe('Header', () => {
  test('renders h1', () => {
    render(<Header />);
    let h1 = screen.getByTestId('header-h1');

    expect(h1).toHaveTextContent('Hello World');
  })
})
