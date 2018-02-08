import { v4 } from 'node-uuid';
import * as api from '../api';
import { getIsFetching } from '../reducers';

const requestTodos = (filter) => ({
	type: 'REQUEST_TODOS',
	filter,
})

const receiveTodos = (filter, response) => ({
	type: 'RECEIVE_TODOS',
	filter,
	response,
})

// в этом экшене делаем два асинхронных диспатча к API
export const fetchTodos = (filter) => (dispatch, getState) => {
	// если isFetching = true то выходим без диспатча
	// так мы не позволяем делать повторый REQUEST (с тем же самым filter поверх)
	if (getIsFetching(getState(), filter)) {
		return Promise.resolve();
	}
	// сначала происходит action.type: 'REQUEST_TODOS' - isFetching становится true
	dispatch(requestTodos(filter));
	// затем передаем в middlewares промис на action.type: 'RECEIVE_TODOS'
	// когда получаем ответ то запускаем reducer
	return api.fetchTodos(filter).then(response => {
		dispatch(receiveTodos(filter, response));
	});
};

export const addTodo = (text) => ({
	type: 'ADD_TODO',
	id: v4(),
	text,
});

export const toggleTodo = (id) => ({
	type: 'TOGGLE_TODO',
	id,
});