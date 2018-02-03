import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';

// создаём стор из редьюсера, таже внутри происходит подписка на изменения стора и перерэндер
const store = configureStore();

render(
	<Root store={store} />,
	document.getElementById('root')
);