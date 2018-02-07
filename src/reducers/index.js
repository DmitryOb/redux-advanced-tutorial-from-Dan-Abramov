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
// 	listByFilter: {all: [], active:[], completed: []} 
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
// 		active: [xxxxxxx],
// 		all: [xxxxxxx, xxxxxxx, xxxxxxx],
// 		completed: [xxxxxxx, xxxxxxx]
// 	}
// }

export default todos;

export const getVisibleTodos = (state, filter) => {
	const ids = fromList.getIds(state.listByFilter[filter]);
	return ids.map(id => fromById.getTodo(state.byId, id));
}