import { createStore } from 'redux';
import todoApp from './reducers';

const addLoggingToDispatch = (store) => {
	const rawDispatch = store.dispatch;
	if (!console.group){ return rawDispatch; }
	return (action) => {
		console.group(action.type);
		console.log('%c prev state', 'color: gray', store.getState());
		console.log('%c action', 'color: blue',action);
		const returnValue = rawDispatch(action);
		console.log('%c next state', 'color: green', store.getState());
		console.groupEnd(action.type);
		return returnValue;
	};
};

const addPromiseSupportToDispatch = (store) => {
	const rawDispatch = store.dispatch;
	return (action) => {
		if (typeof action.then === 'function') {
			return action.then(rawDispatch);
		}
		return rawDispatch(action);
	}
};

const configureStore = () => {

	const store = createStore(todoApp);
	// с помощью этой функции мы логируем наш store.dispatch
	if(process.env.NODE_ENV !== 'production'){
		store.dispatch = addLoggingToDispatch(store);
	}
	// поскольку наш экшн с ожиданием, то оборачиваеме его в функцию для корректной работы:
	// после того как промис выйдет из сосояния pending
	// компонент получит пропсы, отренедрится и вызовет метод в котором сработает store.dispatch
	// запуститься всю цепочка ожиданий (цепочка колбэков), включая функцию для логирования
	store.dispatch = addPromiseSupportToDispatch(store)
	console.log(store.getState());
	return store;
};

export default configureStore;