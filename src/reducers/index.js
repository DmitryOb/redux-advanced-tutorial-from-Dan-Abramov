import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';

const todoApp = combineReducers({ todos })
// const todoApp = (state = {}, action) => {
// 	return {
// 		todos: todos(state.todos, action)
// 	};
// };

export default todoApp;

export const getVisibleTodos = (state, filter) =>
	fromTodos.getVisibleTodos(state.todos, filter);