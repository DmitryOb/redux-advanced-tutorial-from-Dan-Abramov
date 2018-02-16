export const fetchTodos = (filter) => ({ type: 'FETCH_TODOS_REQUEST', filter })

export const addTodo = (text) => ({ type: 'ADD_TODO', text })

export const toggleTodo = (id) => ({ type: 'TOGGLE_TODO', id })