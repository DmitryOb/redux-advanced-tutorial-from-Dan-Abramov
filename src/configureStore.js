import { createStore } from 'redux';
import todoApp from './reducers';

// с помощью этой функции мы логгируем наш store.dispatch
const logger = (store) => (next) => {
	if (!console.group){ return next; }
	return (action) => {
		console.group(action.type);
		console.log('%c prev state', 'color: gray', store.getState());
		console.log('%c action', 'color: blue',action);
		const returnValue = next(action);
		console.log('%c next state', 'color: green', store.getState());
		console.groupEnd(action.type);
		return returnValue;
	};
};

// с помощью этой функции мы определяем поведение для "обычных" экшенов и экшенов с промисами
const promise = (store) => (next) => (action) => {
	// если в качестве action нам пришел promise а не объект вида {type"...",..}
	if (typeof action.then === 'function') {
	// мы ожидаем ответа промиса и помещаем его в next( функцию логгирования - logger)
		return action.then(next);
	}
	// иначе если не промис то сразу логгируем
	return next(action);
};

// мы создаем обертку над "ориганальным" объектом store.dispatch. после срабатывания экшена:
// проходим через функцию promise, затем через logger
const wrapDispatchWithMiddlewares = (store, middlewares) => {
	middlewares.slice().reverse().forEach(middleware => 
		store.dispatch = middleware(store)(store.dispatch)
	)
};

const configureStore = () => {

	const store = createStore(todoApp);
	
	const middlewares = [promise];

	if(process.env.NODE_ENV !== 'production'){ middlewares.push(logger); }
	wrapDispatchWithMiddlewares(store, middlewares);

	return store;
};

export default configureStore;