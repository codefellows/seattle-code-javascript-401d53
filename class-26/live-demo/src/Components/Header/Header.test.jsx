import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '.';

describe('Header', () => {
  it('renders greeting as expected', () => {
    render(<Header greeting="Tester" />);

    let h1 = screen.getByTestId('header-h1');
    expect(h1).toHaveTextContent('Hello Tester');

    // another way
    let anotherH1example = screen.getByText('Hello Tester');
    expect(anotherH1example).toBeTruthy();
    expect(anotherH1example).toBeInTheDocument();
  })
})
