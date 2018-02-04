import { v4 } from 'node-uuid';
import * as api from '../api';

const receiveTodos = (filter, response) => ({
	type: 'RECEIVE_TODOS',
	filter,
	response,
})

// в этом экшене делаем запрос к API в ответ получаем промис и передаем в middlewares
export const fetchTodos = (filter) => 
	api.fetchTodos(filter).then(response => 
		receiveTodos(filter, response)
	);

export const addTodo = (text) => ({
	type: 'ADD_TODO',
	id: v4(),
	text,
});

export const toggleTodo = (id) => ({
	type: 'TOGGLE_TODO',
	id,
});