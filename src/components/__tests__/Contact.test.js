import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Contact from '../Contact';

describe('Contact component test cases', () => {
  //helper functions
  beforeAll(() => {});

  beforeEach(() => {});

  afterAll(() => {});

  afterEach(() => {});

  // test or it can be used interchangeabley
  test('Should load contact component', () => {
    render(<Contact />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });

  it('Should load button inside contact component', () => {
    render(<Contact />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('Should load input name inside contact component', () => {
    render(<Contact />);

    const inputName = screen.getByPlaceholderText('name');
    expect(inputName).toBeInTheDocument();
  });

  test('Should load 2 input boxes inside contact component', () => {
    render(<Contact />);

    const inputBoxes = screen.getAllByRole('textbox');
    // console.log(inputBoxes); //virtualDOM element
    expect(inputBoxes.length).toBe(2);
  });
});
