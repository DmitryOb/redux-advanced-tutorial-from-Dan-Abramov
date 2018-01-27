import { combineReducers } from 'redux';
import todos from './todos';

const todoApp = combineReducers({ todos, })
// const todoApp = (state = {}, action) => {
// 	return {
// 		todos: todos(state.todos, action),
// 		visibilityFilter: visibilityFilter(state.visibilityFilter, action)
// 	};
// };

export default todoApp;