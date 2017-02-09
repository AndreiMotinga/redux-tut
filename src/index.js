import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import expect from 'expect';
import { createStore } from 'redux'

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

const counter = (state = 0, action) => {
  switch(action.type) {
    case('INCREMENT'):
      return state + 1;
    case('DECREMENT'):
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);

const render = () => {
  document.getElementById("redux").innerText = store.getState();
}

store.subscribe(render);
render();

document.addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" });
});
