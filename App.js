import React, { useState } from 'react';
import StartScreen from './components/start-screen';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StartScreen />
      </PersistGate>      
    </Provider>
  );
}