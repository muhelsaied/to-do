import React, { Component } from 'react';
import './App.css';
import Uuid from 'uuid'
import logo from './bcg-1.png'
// bootstrap
import BootStrap from 'bootstrap/dist/css/bootstrap.min.css'


import TodoList from './components/todolist/todolist'
import DoneList from './components/doneList/donelist'
import Reset from './components/reset'
import Alert from './components/alert'

class App extends Component {
  constructor() {
    super()
    this.state =
      {
        newItem: '',
        todoList: [],
        doneList: [],
        id: Uuid(),
        notification: null,
        editItem: false,
        check: false
      }
    this.handleChange = this.handleChange.bind(this)
    this.addToDo = this.addToDo.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.editList = this.editList.bind(this)
    this.submitChange = this.submitChange.bind(this)
    this.doneItem = this.doneItem.bind(this)
    this.deleteAll = this.deleteAll.bind(this)
    this.changeAlert = this.changeAlert.bind(this)
  }


  // components mounts
  componentDidMount() {

  }

  //  change input 
  handleChange = (event) => {
    this.setState({
      newItem: event.target.value
    })

  }

  //  add new to do list 
  addToDo = () => {
    const newItem = {
      text: this.state.newItem,
      id: this.state.id
    }
    const newList = [...this.state.todoList, newItem]
    this.setState({
      todoList: newList,
      newItem: '',
      id: Uuid()
    })
    this.changeAlert('created successfully')
  }

  // update list 
  editList = (id) => {
    const editItem = this.state.todoList.find(item => item.id === id)
    this.setState({
      newItem: editItem.text,
      editItem: true,
      id: id
    })
  }
  submitChange = () => {
    let updateItem = this.state.todoList.find(item => item.id === this.state.id)
    updateItem.text = this.state.newItem
    this.setState({
      newItem: '',
      editItem: false,
      id: Uuid()
    })
    this.changeAlert('successfully saved')

  }

  // done list
  doneItem = () => {

  }

  // delete item 
  deleteItem = (id) => {
    const deleteItem = this.state.todoList.filter(item => item.id !== id)
    this.setState({
      todoList: deleteItem
    })
    this.changeAlert('deleted successfully')
  }
  deleteAll = () => {
    this.setState({
      todoList: []
    }
    )
    this.changeAlert('all to do has been deleted sucessfully')
  }


  //  alert func
  changeAlert = (notification) => {
    this.setState({
      notification
    })
    setTimeout(() => {
      this.setState({
        notification: null
      })
    }, 2500)
  }
  render() {

    this.apiUrl = 'http(s)://5d0fa751c56e7600145a43e3.mockapi.io/'
    return (
      <div className='container'>
        <div className="App card mt-4 rounded">
          <Reset deleteAll={this.deleteAll} />
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <Alert
            {
            ...this.state
            } />
          <TodoList
            {
            ...this.state
            }
            newItem={this.state.newItem}
            handleChange={this.handleChange}
            addToDo={this.addToDo}
            deleteItem={this.deleteItem}
            editList={this.editList}
            submitChange={this.submitChange}
            deleteAll={this.deleteAll}
            doneItem={this.doneItem} />
          <DoneList
            {
            ...this.state
            }
          />
        </div>
      </div>

    );
  }
}

export default App;

