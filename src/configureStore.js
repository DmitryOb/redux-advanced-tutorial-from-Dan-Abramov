import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import todoApp from './reducers/index.js';

const configureStore = () => {
// добавляем thunk (преобразователь) middlewares для множественных экшенов
// используем его после логирования в том случае когда у нас промис
	const middlewares = [thunk];
	// используем готовую библиотеку для логирования диспатчей
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