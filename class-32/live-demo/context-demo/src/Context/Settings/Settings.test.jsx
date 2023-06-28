import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import SettingsProvider, { SettingsContext } from '.';

describe('Settings Context', () => {
  test('provides initial state for consumption', () => {
    render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {
            ({ email, title }) => {
              return (
                <>
                  <h1 data-testid="title">{title}</h1>
                  <h3 data-testid="email">{email}</h3>
                </>
              )
            }
          }
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    const title = screen.getByTestId('title');
    const email = screen.getByTestId('email');
    expect(title).toHaveTextContent('Some Site');
    expect(email).toHaveTextContent('ryan@codefellows.com');    
  });
});
