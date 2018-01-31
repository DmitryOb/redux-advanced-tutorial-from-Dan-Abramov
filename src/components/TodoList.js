import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onTodoClick }) => (
	<ul>
		{
			todos.map(todo =>
				<Todo 
					key={todo.id}
					//text={todo.text}
					//completed={todo.completed}
					{...todo}
					onClick={() => onTodoClick(todo.id)}
				/>
			)
		}
	</ul>
);

export default TodoList;