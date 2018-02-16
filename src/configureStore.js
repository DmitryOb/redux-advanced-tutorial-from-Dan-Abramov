import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import todoApp from './reducers/index.js';
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware()
	const middlewares = [sagaMiddleware];

	if(process.env.NODE_ENV !== 'production'){ 
		middlewares.push(createLogger); 
	}
	
	const store = createStore(
		todoApp,
		applyMiddleware(...middlewares)
	);
	sagaMiddleware.run(mySaga)
	return store;
};

export default configureStore;