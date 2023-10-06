import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import MOCK_DATA from '../mocks/resMenuMock.json';
import appStore from '../../utils/appStore';
import RestaurantMenu from '../RestaurantMenu';
import Header from '../Header';
import Cart from '../Cart';

global.fetch = jest.fn(() => {
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  });
});

it('Should load restaurant menu compnent', async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
          <Cart />
        </Provider>
      </BrowserRouter>,
    ),
  );

  const accordionHeader = screen.getByText('Biryani');
  fireEvent.click(accordionHeader);
  expect(screen.getAllByTestId('foodItems').length).toBe(5);

  expect(screen.getByText('Cart - (1 items)')).toBeInTheDocument();
});
