import React from 'react';
import { render } from '@testing-library/react-native';
import Index from '../index';
import { useUserStore } from '../../lib/store';

jest.mock('../../lib/store');

describe('Index Screen', () => {
  it('renders the login button when the user is not authenticated', () => {
    (useUserStore as jest.Mock).mockReturnValue({ authenticated: false });
    const { getByText } = render(<Index />);
    expect(getByText('Log in')).toBeTruthy();
  });
});
