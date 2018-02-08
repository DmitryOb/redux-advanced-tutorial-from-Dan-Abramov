import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import todoApp from './reducers/index.js';

// добавляем thunk (преобразователь) middlewares для множественных экшенов
// используем его после логирования в том случае когда у нас промис
const thunk = (store) => (next) => (action) => 
//если в качестве action нам пришел promise а не объект вида {type"...",..}
	typeof action === 'function' ? action(store.dispatch) : next(action);

const configureStore = () => {

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