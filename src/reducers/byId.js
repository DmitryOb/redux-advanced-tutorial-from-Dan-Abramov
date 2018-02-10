const byId = (state = {}, action) => {
	switch (action.type) {
		case 'FETCH_TODOS_SUCCESS':
			const nextState = { ...state };
			action.response.forEach(todo =>{
				// todo = {id: "xxxxxxx", text: "ho", completed: true}
				// записываем каждый todo в объект nextState
				nextState[todo.id] = todo;
			})
			// на выходе получаем объект с 3 объектами формата:
			// xxxxxxx: {id: 'xxxxxxx', text: 'ho', completed: true},
			return nextState;
		default: return state;
	}
};

export default byId;

export const getTodo = (state, id) => state[id];