import { Provider, connect } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { addTodo } from '../actions'

let AddTodo = ({ dispatch }) => {
	let input;
	return (
		<div>
			<input ref = { node => { input = node;} } />
			<button onClick={()=>{ dispatch(addTodo(input.value));
				input.value = '';}}> Add Todo </button>
		</div>
	);
};
AddTodo = connect()(AddTodo);

export default AddTodo;