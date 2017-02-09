import React from 'react';
import ReactDOM from 'react-dom';
// import expect from 'expect';
import { createStore } from 'redux'

const counter = (state = 0, action) => {
  switch(action.type) {
    case('INCREMENT'):
      console.log("increment")
      return state + 1;
    case('DECREMENT'):
      console.log("decrement")
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);

// component
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
)

const render = () => {
  ReactDOM.render(
      <Counter value={store.getState()}
               onIncrement={() => store.dispatch({ type: "INCREMENT" })}
               onDecrement={() => store.dispatch({ type: "DECREMENT" })}
               />,
    document.getElementById("root")
  );
}

store.subscribe(render);
render();
