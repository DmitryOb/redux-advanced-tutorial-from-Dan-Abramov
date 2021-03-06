import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

const listByFilter = combineReducers({
	all: createList('all'),
	active: createList('active'),
	completed: createList('completed')
})

const todos = combineReducers({ byId, listByFilter })
// const todos = (state = {}, action) => {
// 	return {
// 		byId: byId(state.byId, action),
//		listByFilter: listByFilter(state.listByFilter, action)
// 	};
// };

// формат нашего cтэйта при INIT:
// {
// 	byID: {},
// 	listByFilter: {
// 		all: {ids:[], isFetching: false, errorMessage 'null'}, 
// 		active:{ids:[], isFetching: false, errorMessage 'null'}, 
// 		completed: {ids:[], isFetching: false, errorMessage 'null'}
// }

// после ответа от API формат стэйта таков
// фильтр редьюсера накаладывается поверх фильтра роутера:
// {
// 	byID: {
// 		xxxxxxx: {id: 'xxxxxxx', text: 'lets go', completed: false},
// 		xxxxxxx: {id: 'xxxxxxx', text: 'ho', completed: true},
// 		xxxxxxx: {id: 'xxxxxxx', text: 'hey', completed: true}
// 	},
// 	listByFilter: {
// 		active: { ids:[xxxxxxx], isFetching: false, errorMessage 'Boom'},
// 		all: { ids:[xxxxxxx, xxxxxxx, xxxxxxx], isFetching: true, errorMessage 'Boom'},
// 		completed: { ids:[xxxxxxx, xxxxxxx], isFetching: true, errorMessage 'Boom'}
// 	}
// }

export default todos;

// наделяем пропсами компонент из createList.js
export const getVisibleTodos = (state, filter) => {
	const ids = fromList.getIds(state.listByFilter[filter]);
	return ids.map(id => fromById.getTodo(state.byId, id));
}
export const getIsFetching = (state, filter) =>
//при INIT в случае с all пердаем в функцию {ids:[], isFetching: false}
	//getIsFetching = (state) => state.isFetching;
	fromList.getIsFetching(state.listByFilter[filter]);
export const getErrorMEssage = (state, filter) =>
	fromList.getErrorMEssage(state.listByFilter[filter]);