import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import expect from 'expect';
// import { createStore } from 'redux'

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  return { getState, dispatch, subscribe };
}
