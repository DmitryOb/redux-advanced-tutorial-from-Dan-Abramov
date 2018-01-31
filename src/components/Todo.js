import { Provider, connect } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Todo = ({ onClick, completed, text }) => (
	<li
		onClick={onClick}
		style={ {textDecoration: completed ? 'line-through' : 'none'} }
	>
		{text}
	</li>
);

export default Todo;