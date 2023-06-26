import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { saveConversionHistory, loadConversionHistory } from './localStorage';
import { setConversionHistory } from './actions/actions';

const conversionHistory = loadConversionHistory();
store.dispatch(setConversionHistory(conversionHistory));

store.subscribe(() => {
  const state = store.getState();
  const { conversionHistory } = state;
  saveConversionHistory(conversionHistory);
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);



