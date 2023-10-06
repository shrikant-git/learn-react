import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import Body from '../Body';
import MOCK_DATA from '../mocks/resListMock.json';

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

describe('Search component test cases', () => {
  // test or it can be used interchangeabley
  it('Should search restaurant list for burger', async () => {
    // whenever we need async function use act
    await act(async () =>
      render(
        <BrowserRouter>
          <Body />
        </BrowserRouter>,
      ),
    );
    const cardsBeforeSearch = screen.getAllByTestId('resCard');
    expect(cardsBeforeSearch.length).toBe(20);

    const screenBtn = screen.getByRole('button', { name: 'Search' });
    const searchInput = screen.getByTestId('searchInput');
    fireEvent.change(searchInput, { target: { value: 'burger' } });
    fireEvent.click(screenBtn);
    const cardsAfterSearch = screen.getAllByTestId('resCard');
    expect(cardsAfterSearch.length).toBe(2);
  });

  it('Should filter top rated restaurant', async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Body />
        </BrowserRouter>,
      ),
    );
    const cardsBeforeSearch = screen.getAllByTestId('resCard');
    expect(cardsBeforeSearch.length).toBe(20);

    const topRatedButton = screen.getByRole('button', { name: 'Top Rated Restaurants' });
    // const searchInput = screen.getByTestId('searchInput');
    // fireEvent.change(searchInput, { target: { value: 'burger' } });
    fireEvent.click(topRatedButton);
    const cardsAfterFilter = screen.getAllByTestId('resCard');
    expect(cardsAfterFilter.length).toBe(18);
  });
});
