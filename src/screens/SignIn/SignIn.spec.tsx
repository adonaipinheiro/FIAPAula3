import React from 'react';
import {render, screen} from '@testing-library/react-native';

import SignIn from '.';

jest.mock('@react-navigation/native');
jest.mock('react-redux');
jest.mock('react-i18next');
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

describe('SignIn', () => {
  beforeEach(() => {
    render(<SignIn />);
  });
  it('should render corretly', () => {
    const signInScreen = screen;
    expect(signInScreen).toBeTruthy();
  });
  it('should match snapshot', () => {
    const signInScreen = screen.toJSON();
    expect(signInScreen).toMatchSnapshot();
  });
});
