import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('Button', () => {
  it('renders correctly with the given label', () => {
    const { getByText } = render(<Button label="Test Button" handler={() => {}} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls the handler function when pressed', () => {
    const handler = jest.fn();
    const { getByText } = render(<Button label="Test Button" handler={handler} />);
    const button = getByText('Test Button');
    fireEvent.press(button);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
