/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import {renderWithProviders} from '../src/utils/test-utils';

it('renders correctly', () => {
  renderWithProviders(<App />);
});
