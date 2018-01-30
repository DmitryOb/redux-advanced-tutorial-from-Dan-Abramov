import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';

// здесь происходит считывание локалсторэджа, на основание этого 
// создание стора из редьюсера, затем запись в локалсторэдж результатов считывания
// таже внутри происходит подписка на изменения стора и перерэндер
const store = configureStore();

render(
	<Root store={store} />,
	document.getElementById('root')
);