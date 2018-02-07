import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import todoApp from './reducers/index.js';

// используем готовые библиотеки для поддержки промисов и логгирования диспатчей
const configureStore = () => {

	const middlewares = [promise];

	if(process.env.NODE_ENV !== 'production'){ 
		middlewares.push(createLogger); 
	}
	// при необходимости можно добавить persistedState
	return createStore(
		todoApp,
		applyMiddleware(...middlewares)
	);
};

export default configureStore;