import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Provider, connect } from 'react-redux';
// всё из экспорта '../actions' теперь будет здесь как в объекте actions так и отдельно
import * as actions from '../actions'
import TodoList from './TodoList';
import { todos } from '../reducers';
import { getVisibleTodos } from '../reducers';

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
	fetchData(){
		const { filter, fetchTodos } = this.props;
		fetchTodos(filter);
	}

	render(){
		// в '...rest' хранятся вообще все пропсы из класса формата toggleTodo = this.props.toggleTodo
		const { toggleTodo, ...rest } = this.props;
		return (
				<TodoList 
					{...rest} 
					onTodoClick={ toggleTodo }
				/>
		);
	}

}

// наделим компонент пропсом фильтра: this.props.filter
const mapStateToProps = (state, { match:{params} } ) => {
	const filter = params.filter || 'all';
	return {
		todos: getVisibleTodos(state, filter),
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