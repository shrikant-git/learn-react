import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from '../Header';
import appStore from '../../utils/appStore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('Header component test cases', () => {
  // test or it can be used interchangeabley
  it('Should render header component with login button', () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>,
    );

    const button = screen.getByRole('button', { name: 'Login' }); //to get specific button
    expect(button).toBeInTheDocument();
  });

  it('Should render header component with 0 cart items', () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>,
    );

    const cartItems = screen.getByText('Cart (0 items)');
    expect(cartItems).toBeInTheDocument();
  });

  it('Should render header component with cart item', () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>,
    );

    const cartItems = screen.getByText(/Cart/); //regex
    expect(cartItems).toBeInTheDocument();
  });

  it('Should change login button to logout', () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>,
    );

    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);

    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    expect(logoutButton).toBeInTheDocument();
  });
});
