import React from 'react';
import {render} from '@testing-library/react-native';

import SignInScreen from '../SignInScreen';

describe('SignIn Screen', () => {
  it('Should render a button with text Sign in to Spotify', () => {
    const {getByText} = render(<SignInScreen />);

    getByText('Sign in to Spotify');
  });
});
