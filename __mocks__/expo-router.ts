import React from 'react';

// Mock useRouter
export const useRouter = jest.fn().mockReturnValue({
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  canGoBack: jest.fn().mockReturnValue(true),
  setParams: jest.fn(),
});

// Mock useLocalSearchParams
export const useLocalSearchParams = jest.fn().mockReturnValue({});

// Mock Link
export const Link = ({ children, href, ...props }: any) => {
  return React.createElement('Link', { href, ...props }, children);
};

// Mock Redirect
export const Redirect = jest.fn(() => null);

// Mock Slot
export const Slot = jest.fn(() => null);

// Mock Tabs (if you use them)
export const Tabs = Object.assign(
  ({ children }: any) => React.createElement('Tabs', {}, children), 
  {
    Screen: ({ children }: any) => React.createElement('Tabs.Screen', {}, children),
  }
);

// Mock Stack (Common source of errors if Screen is missing)
export const Stack = Object.assign(
  ({ children }: any) => React.createElement('Stack', {}, children),
  {
    Screen: ({ children }: any) => React.createElement('Stack.Screen', {}, children),
  }
);

export default {
  useRouter,
  useLocalSearchParams,
  Link,
  Redirect,
  Slot,
  Tabs,
  Stack,
};