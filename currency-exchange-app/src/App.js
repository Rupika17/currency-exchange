import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css'

import Layout from './components/Layout';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
       <Layout />
      </div>
    </Provider>
  );
};

export default App;



