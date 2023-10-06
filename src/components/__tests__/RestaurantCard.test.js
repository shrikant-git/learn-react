import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import RestaurantCard from '../RestaurantCard';
import MOCK_DATA from '../mocks/resCardMock.json';
// import appStore from '../../utils/appStore';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';

describe('RestaurantCard component test cases', () => {
  // test or it can be used interchangeabley
  it('Should render RestaurantCard component', () => {
    render(<RestaurantCard resData={MOCK_DATA} />);

    const name = screen.getByText('Faasos - Wraps & Rolls');
    expect(name).toBeInTheDocument();
  });
});
