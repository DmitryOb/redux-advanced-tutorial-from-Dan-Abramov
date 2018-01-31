import React from 'react';
import { withRouter } from 'react-router';
import { Provider, connect } from 'react-redux';
import { toggleTodo } from '../actions'
import TodoList from './TodoList';
import { todos } from '../reducers';

const getVisibleTodos = (todos, filter) => {
	switch (filter){
		case 'all': return todos;
		case 'completed': return todos.filter( t => t.completed )
		case 'active': return todos.filter( t => !t.completed )
		default: throw new Error('Unknown filter: ${filter}.');
	}
}

const mapStateToProps = (state, { match:{params} } ) => ({
	todos: getVisibleTodos(state.todos, params.filter || 'all')
});

// const mapDispatchToProps = (dispatch) => ({
// 	onTodoClick(id) { dispatch(toggleTodo(id)) }
// });

const VisibleTodoList = withRouter(connect(mapStateToProps, { onTodoClick: toggleTodo })(TodoList));

export default VisibleTodoList;