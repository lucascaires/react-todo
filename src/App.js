import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.addTask = this.addTask.bind(this)
    this.removeTask = this.removeTask.bind(this)
    this.completeTask = this.completeTask.bind(this)
    this.state = {
      todos: [],
      id: 1
    }
  }

  addTask(e) {
    e.preventDefault()
    let todos = this.state.todos
    let todo = {}
    todo.task = this.refs.task.value
    todo.isCompleted = false
    todo.id = this.state.id
    todos.push(todo)
    this.setState({
      todos: todos,
      id: this.state.id + 1
    })
    this.refs.todoForm.reset()
  }

  removeTask(id) {
    let newTodos = this.state.todos.filter(todo => todo.id !== id)
    this.setState({
      todos: newTodos
    })
  }

  completeTask(id) {
    let newTodos = this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.isCompleted = !todo.isCompleted
      }
      return todo
    })
    this.setState({
      todos: newTodos
    })
  }

  render() {
    let self = this.state
    return (
      <div className="App">
        <h1>Awesome Todo!</h1>
        <form ref="todoForm">
          <div className="input-block">
            <input type="text" ref="task" placeholder="To do..."/>
          </div>          
          <button className="input-button" onClick={this.addTask}>Add Task</button>
        </form>   
        <ul className="task-list">
        {
          self.todos.map(todo => {
            return (
              <li className="task-item" key={ todo.id }>                
                <span><input type="checkbox" onChange={this.completeTask.bind(null, todo.id)}/></span>
                <span className={!todo.isCompleted || 'isDone'}>{ todo.task }</span>
                <span><button onClick={this.removeTask.bind(null, todo.id )} disabled={!todo.isCompleted}>Excluir</button></span>
              </li>
            )
          })
        }
        </ul>   
      </div>
    );
  }
}

export default App;
