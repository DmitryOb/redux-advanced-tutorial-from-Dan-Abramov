import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// всё из экспорта '../actions' теперь будет здесь как в объекте actions так и отдельно
import * as actions from '../actions'
import TodoList from './TodoList';
import { getVisibleTodos, getIsFetching } from '../reducers';

class VisibleTodoList extends Component {

	// после того как компонент отрендерился вызываем метод fetchData()
	componentDidMount(){
		this.fetchData();
	}

	// и если компонент обновился и изменился filter то тоже вызываем метод fetchData()
	componentDidUpdate(prevProps){
		if (this.props.filter !== prevProps.filter){
			this.fetchData();
		}
	}

	// этот метод принимает в качестве аргумента пропсы: filter и экшн fetchTodos
	// делаем dispatch action fetchTodos с параметром filter
	// fetchTodos(filter) возвращает промис и можно использовать .then
	fetchData(){
		const { filter, fetchTodos } = this.props;
		fetchTodos(filter);
	}

	render(){
		const { toggleTodo, todos, isFetching } = this.props;
		// при action.type REQUEST_TODOS isFetching будет true
		if (isFetching && !todos.length) {
			return <p>Loading...</p>;
		}
		return (
				<TodoList 
					todos={todos}
					onTodoClick={ toggleTodo }
				/>
		);
	}

}

// наделяем компонент пропсами обращаясь к редьюсеру
const mapStateToProps = (state, { match:{params} } ) => {
	const filter = params.filter || 'all';
	return {
		todos: getVisibleTodos(state, filter),
		isFetching: getIsFetching(state, filter),
		filter
	}
}

// оборачиваем компонент withRouter'ом чтобы он мог принимать params.filter
// аргументом "actions" передаем все экшн криеторы как пропсы вида toggleTodo = this.props.toggleTodo
VisibleTodoList = withRouter(connect(
	mapStateToProps, 
	actions
)(VisibleTodoList));

export default VisibleTodoList;