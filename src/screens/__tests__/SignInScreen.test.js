import React from 'react';
import {renderWithProviders} from '../../utils/test-utils';

import SignInScreen from '../SignInScreen';

describe('SignIn Screen', () => {
  it('Should render a button with text Sign in to Spotify', () => {
    const {getByText} = renderWithProviders(<SignInScreen />);

    getByText('Sign in to Spotify');
  });
});
