import React from 'react';
import { render } from '@testing-library/react-native';
import Index from '../index';
import { useUserStore } from '../../lib/store';

// 1. Mock the store module
jest.mock('../../lib/store', () => ({
  useUserStore: jest.fn(),
}));

describe('Index Screen', () => {
  it('renders the login button when the user is not authenticated', () => {
    // 2. create the desired state
    const mockState = { authenticated: false };

    // 3. Use mockImplementation to handle both selectors and direct access
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) => {
      // If the component passes a selector function, run it against our state
      if (selector) {
        return selector(mockState);
      }
      // Otherwise return the whole state
      return mockState;
    });

    const { getByText, debug } = render(<Index />);
    
    // Optional: Print what is actually rendering if it still fails
    // debug(); 

    expect(getByText('Log in')).toBeTruthy();
  });
});