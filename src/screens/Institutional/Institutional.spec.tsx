import React from 'react';
import {render, screen} from '@testing-library/react-native';

import Institutional from '.';

describe('Institutional', () => {
  beforeEach(() => {
    render(<Institutional />);
  });
  it('should render corretly', () => {
    const institutionalScreen = screen.getByTestId('InstitutionalScreen');
    expect(institutionalScreen).toBeTruthy();
  });
  it('should render title', () => {
    const text = screen.getByText('FIAP');
    expect(text).toBeTruthy();
  });
  it('should Match snapshot', () => {
    const institutionalScreen = screen.toJSON();
    expect(institutionalScreen).toMatchSnapshot();
  });
});
