import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
// import expect from 'expect';
// import deepFreeze from 'deep-freeze';
import { createStore, combineReducers } from 'redux';

import todo from './todo';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import getVisibleTodos from './getVisibleTodos';

const todoApp = combineReducers({ todos, visibilityFilter });
const store = createStore(todoApp);

const FilterLink = ({filter, children, currentFilter}) => {
  if(filter === currentFilter) {
    return <span>{children}</span>
  }
  return (
    <a href="#" onClick={(e) => {
      e.preventDefault();
      store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter
      })
    }}>
      {children}
    </a>
  )
}

const Todo = ({
  onClick,
  completed,
  text
}) => {
  return (
    <li onClick={onClick}
        style={{
          textDecoration:
            completed ?
              'line-through' : 'none'
        }}>
      {text}
    </li>
  )
}

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    const { todos, visibilityFilter } = this.props;
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);

    return (
      <div>
        <h1>Add todo here</h1>
        <form>
          <input ref={(node) => {
            this.input = node;
          }} />
          <button type="submit" onClick={(e) => {
            e.preventDefault();
            store.dispatch({
              type: "ADD_TODO",
              id: nextTodoId++,
              text: this.input.value,
            })
            this.input.value = '';
          }}>
            Add Todo
          </button>
        </form>
        <ul>
          {visibleTodos.map(todo =>
          <Todo
            key={todo.id}
            completed={todo.completed}
            text={todo.text}
          />
          )}
        </ul>
        <p>
          Show:{' '}
          <FilterLink
            filter='SHOW_ALL'
            currentFilter={visibilityFilter}>
            All
          </FilterLink>{' '}
          <FilterLink
            filter="SHOW_ACTIVE"
            currentFilter={visibilityFilter}>
            Active
          </FilterLink>{' '}
          <FilterLink
            filter="SHOW_COMPLETED"
            currentFilter={visibilityFilter}>
            Completed
          </FilterLink>
        </p>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
      <TodoApp {...store.getState()}/>,
    document.getElementById('root')
  );
}
// seed store
["Buy Milk", "Pick up kids", "Learn React", "And Redux"].map(item => {
  const bool = Math.random() < 0.5 // random boolean
  store.dispatch({
    type: "ADD_TODO",
    id: nextTodoId++,
    text: item,
    completed: bool
  });
});

store.subscribe(render);
render();
