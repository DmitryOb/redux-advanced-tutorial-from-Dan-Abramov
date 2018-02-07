const byId = (state = {}, action) => {
	switch (action.type) {
		case 'RECEIVE_TODOS':
			const nextState = { ...state };
			action.response.forEach(todo =>{
				// todo = {id: "xxxxxxx", text: "ho", completed: true}
				// записываем каждый todo в объект nextState в формате:
				// xxxxxxx: {id: 'xxxxxxx', text: 'ho', completed: true},
				nextState[todo.id] = todo;
			})
			return nextState;
		default: return state;
	}
};

export default byId;

export const getTodo = (state, id) => state[id];