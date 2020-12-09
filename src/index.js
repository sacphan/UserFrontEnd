import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from 'src/redux/recuder/RoorReducer';

const store = createStore(rootReducer);
ReactDOM.render((
  <Provider store={store}>
     <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
 
), document.getElementById('root'));

serviceWorker.unregister();
