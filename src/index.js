import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux' 
import Root from './router/Root';
import todoApp from './reducers/index'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(todoApp)

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

registerServiceWorker();