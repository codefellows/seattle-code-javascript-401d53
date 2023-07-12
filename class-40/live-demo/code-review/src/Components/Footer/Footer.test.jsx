import { render, screen } from '@testing-library/react';
import Footer from '.';

describe('Footer component', () => {
  test('renders content', () => {
    render(<Footer />);

    const footer = screen.getByTestId('footer');
    expect(footer).toHaveTextContent('Code Fellows')
  })
})
