import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Provider, connect } from 'react-redux';
// всё из экспорта '../actions' теперь будет здесь как в объекте actions так и отдельно
import * as actions from '../actions'
import TodoList from './TodoList';
import { todos } from '../reducers';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';

class VisibleTodoList extends Component {

	//после отображения компонента делаем фетч
	componentDidMount(){
		this.fetchData();
	}

	//после обновления компонента (если фильтра сменился у роутера) делаем фетч
	componentDidUpdate(prevProps){
		if (this.props.filter !== prevProps.filter){
			this.fetchData();
		}
	}

	// делаем dispatch action receiveTodos после действий роутера с параметром фетча
	fetchData(){
		const { filter, receiveTodos } = this.props;
		fetchTodos(filter).then(todos =>
			receiveTodos(filter, todos)
		)
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
// и вторым аргументом "actions" передаем все экшн криеторы как пропсы вида toggleTodo = this.props.toggleTodo
VisibleTodoList = withRouter(connect(
	mapStateToProps, 
	actions
)(VisibleTodoList));

export default VisibleTodoList;