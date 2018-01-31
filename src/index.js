import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';
import { fetchTodos } from './api';

// запрашиваем наш объект с аругментом фильтра через задержку с промисом и выводим его в консоль
fetchTodos('all').then(todos => console.log(todos))

// создаём стор из редьюсера, таже внутри происходит подписка на изменения стора и перерэндер
const store = configureStore();

render(
	<Root store={store} />,
	document.getElementById('root')
);