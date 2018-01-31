import React from 'react';
import { withRouter } from 'react-router';
import { Provider, connect } from 'react-redux';
import { toggleTodo } from '../actions'
import TodoList from './TodoList';
import { todos } from '../reducers';
import { getVisibleTodos } from '../reducers';

const mapStateToProps = (state, { match:{params} } ) => ({
	todos: getVisibleTodos(state, params.filter || 'all')
});

// const mapDispatchToProps = (dispatch) => ({
// 	onTodoClick(id) { dispatch(toggleTodo(id)) }
// });

const VisibleTodoList = withRouter(connect(mapStateToProps, { onTodoClick: toggleTodo })(TodoList));

export default VisibleTodoList;