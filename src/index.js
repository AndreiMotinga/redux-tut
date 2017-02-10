import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
// import expect from 'expect';
// import deepFreeze from 'deep-freeze';
import { createStore, combineReducers } from 'redux';

const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: action.completed
      };
    case 'TOGGLE_TODO':
      if(state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
}

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
}

const todoApp = combineReducers({ todos, visibilityFilter });
const store = createStore(todoApp);

const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case("SHOW_ALL"):
      return todos;
    case("SHOW_COMPLETED"):
      return todos.filter(t => t.completed);
    case("SHOW_ACTIVE"):
      return todos.filter(t => !t.completed);
  }
}

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
            <li key={todo.id}
                onClick={ () => {
                  store.dispatch({
                    type: 'TOGGLE_TODO',
                    id: todo.id
                  });
                }}
                style={{
                  textDecoration:
                    todo.completed ?
                      'line-through' : 'none'
                }}>
              {todo.text}
            </li>
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
