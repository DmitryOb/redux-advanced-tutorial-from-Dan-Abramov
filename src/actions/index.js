import { normalize } from 'normalizr';
import * as schema from './schema';
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
	// диспатчим отсортированные по id объекты
	// благодаря этому нам проще собирать редьюсер - не нужно мапить каждый todo
			dispatch({
				type: 'FETCH_TODOS_SUCCESS',
				filter,
				response: normalize(response, schema.arrayOfTodos),
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

export const addTodo = (text) => (dispatch) =>
	api.addTodo(text).then(response => {
		dispatch({
			type: 'ADD_TODO_SUCCESS',
			response: normalize(response, schema.todo),
		})
	})

export const toggleTodo = (id) => (dispatch) =>
	api.toggleTodo(id).then(response =>{
		dispatch({
			type: 'TOGGLE_TODO_SUCCESS',
			response: normalize(response, schema.todo),
		})
	})