import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Provider, connect } from 'react-redux';
import { toggleTodo } from '../actions'
import TodoList from './TodoList';
import { todos } from '../reducers';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';

class VisibleTodoList extends Component {

	//после отображения компонента выводим в консоль фетч
	componentDidMount(){
		fetchTodos(this.props.filter).then(todos =>
			console.log(this.props.filter, todos)
		)
	}

	//после обновления компонента (смены фильтра у роутера) выводим в консоль фетч
	componentDidUpdate(prevProps){
		if (this.props.filter !== prevProps.filter){
			fetchTodos(this.props.filter).then(todos=>
				console.log(this.props.filter, todos)
			)
		}
	}

	render(){
		return <TodoList {...this.props} />;
	}

}

// наделим компонент пропсом фильтра - this.props.filter
const mapStateToProps = (state, { match:{params} } ) => {
	const filter = params.filter || 'all';
	return {
		todos: getVisibleTodos(state, filter),
		filter
	}
}

// const mapDispatchToProps = (dispatch) => ({
// 	onTodoClick(id) { dispatch(toggleTodo(id)) }
// });

//оборачиваем компонент withRouter'ом чтобы он мог принимать params.filter
VisibleTodoList = withRouter(connect(mapStateToProps, { onTodoClick: toggleTodo })(VisibleTodoList));

export default VisibleTodoList;