import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import todoApp from './reducers';
import { loadState, saveState } from './localStorage';

const addLoggingToDispatch = (store) => {
	const rawDispatch = store.dispatch;
	if (!console.group){
		return rawDispatch;
	}

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

const configureStore = () => {
	const persistedState = loadState();
	// создаем стор из todoApp и добавляем начальное состояние :
	// результат распарсивания localStorage.getItem('state') либо undefined
	const store = createStore(todoApp, persistedState);

	if(process.env.NODE_ENV !== 'production'){
		store.dispatch = addLoggingToDispatch(store);
	}

	console.log(store.getState());

	//если стор изменился то записываем в стор localStorage.setItem('state')
	store.subscribe(
		throttle( () => { saveState({ todos: store.getState().todos }); }, 1000 )
	);

	return store;
}

export default configureStore;