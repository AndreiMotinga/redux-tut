import React, { Component } from 'react';

class Todo extends Component {
  render() {
    const { handleClick, completed, text } = this.props;
    return (
      <li onClick={handleClick}
          style={{textDecoration: completed ? 'line-through' : 'none'}}>
        {text}
      </li>
    );
  }
}

export default Todo;
