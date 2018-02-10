import { v4 } from 'node-uuid';

//todos:(3) [{…}, {…}, {…}]
const fakeDatabase = {
	todos:[
		{ id: v4(), text: 'hey', completed: true, },
		{ id: v4(), text: 'ho', completed: true, },
		{ id: v4(), text: 'let’s go', completed: false, }
	],
};

const delay = (ms) =>
	new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
	delay(1500).then(() => {
		// имитируем случайную ошибку
		if (Math.random() > 0.5){ throw new Error('Boom!'); }
		switch (filter) {
			case 'all': return fakeDatabase.todos
			case 'active': return fakeDatabase.todos.filter(t => !t.completed)
			case 'completed': return fakeDatabase.todos.filter(t => t.completed)
			default: throw new Error(`Unknown filter: ${filter}.`);
		}
	});