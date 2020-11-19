import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import reducer from './reducers/reducer';
import App from './App';
import thunk from 'redux-thunk';
// подключаем redux с midleware, чтобы делать запросы в action
const store : Store = createStore(
	reducer,
	applyMiddleware(apiMiddleware, thunk)
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
