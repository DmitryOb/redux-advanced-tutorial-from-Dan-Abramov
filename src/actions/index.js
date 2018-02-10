import { v4 } from 'node-uuid';
import * as api from '../api';
import { getIsFetching } from '../reducers';

// в этом экшене делаем два асинхронных диспатча к API
export const fetchTodos = (filter) => (dispatch, getState) => {
	// если isFetching = true то выходим без диспатча
	// так мы не позволяем делать повторый REQUEST (с тем же самым filter поверх)
	if (getIsFetching(getState(), filter)) {
		return Promise.resolve();
	}
	// сначала происходит action.type: 'FETCH_TODOS_REQUEST' - isFetching становится true
	dispatch({
		type: 'FETCH_TODOS_REQUEST',
		filter,
	});
	// затем передаем в middlewares промис и ждем FAILURE/SUCCESS диспатча
	// когда получаем ответ то запускаем reducer
	return api.fetchTodos(filter).then(
		response => {
			dispatch({
				type: 'FETCH_TODOS_SUCCESS',
				filter,
				response,
			});
		},
		error => {
			dispatch({
				type: 'FETCH_TODOS_FAILURE',
				filter,
				message: error.message || 'Something went wrong.'
			})
		}
	);
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