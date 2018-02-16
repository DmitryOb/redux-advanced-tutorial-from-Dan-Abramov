import { call, put, takeEvery } from 'redux-saga/effects'
import * as Api from './api';
import { normalize } from 'normalizr';
import * as schema from './actions/schema';

// worker Saga: будет запускаться на экшены типа `FETCH_TODOS_REQUEST`
function* fetchTodos(action) {
	try {
		const filter = action.filter;
		const response = yield call(Api.fetchTodos, filter);
		yield put({type: 'FETCH_TODOS_SUCCESS', filter, response: normalize(response, schema.arrayOfTodos)});
	} catch (e) {
		const filter = action.filter;
		yield put({type: 'FETCH_TODOS_FAILURE', filter, message: e.message});
	}
}

function* addTodo(action) {
	try {
		const text = action.text
		const response = yield call(Api.addTodo, text);
		yield put({type: 'ADD_TODO_SUCCESS', response: normalize(response, schema.todo)})
	} catch (e) {
		console.log(e.message)
	}
}

function* toggleTodo(action) {
	try {
		const id = action.id
		const response = yield call(Api.toggleTodo, id);
		yield put({type: 'TOGGLE_TODO_SUCCESS', response: normalize(response, schema.todo)})
	} catch (e) {
		console.log(e.message)
	}
}

function* mySaga() {
	yield takeEvery('FETCH_TODOS_REQUEST', fetchTodos);
	yield takeEvery('ADD_TODO', addTodo);
	yield takeEvery('TOGGLE_TODO', toggleTodo);
}

export default mySaga;