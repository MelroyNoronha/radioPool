import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

import {store} from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';

const persistor = persistStore(store);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
