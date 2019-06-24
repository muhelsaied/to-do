import React, { Component } from 'react';
import './App.css';
import Uuid from 'uuid'
import logo from './bcg-1.png'
// bootstrap
import BootStrap from 'bootstrap/dist/css/bootstrap.min.css'


import TodoList from './components/todolist/todolist'
import Reset from './components/reset'
import Alert from './components/alert'

class App extends Component {
  constructor() {
    super()
    this.state =
      {
        newItem: '',
        todoList: [],
        checkList: [],
        id: Uuid(),
        notification: null,
        editItem: false,
        checked: false
      }
    this.handleChange = this.handleChange.bind(this)
    this.addToDo = this.addToDo.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.editList = this.editList.bind(this)
    this.submitChange = this.submitChange.bind(this)
    // this.checkItem = this.checkItem.bind(this)
    this.deleteAll = this.deleteAll.bind(this)
    this.changeAlert = this.changeAlert.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }


  //compenent 
  componentDidMount() {
    this.getStorage()
    console.log(this.getStorage())
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
      id: this.state.id,
      checked: this.state.checked
    }
    const newList = [...this.state.todoList, newItem]
    this.setState({
      todoList: newList,
      newItem: '',
      id: Uuid()
    }, () => { this.syncStorage() })
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
    }, () => { this.syncStorage() })
    this.changeAlert('changed successfully ')

  }


  // delete item 
  deleteItem = (id) => {
    const deleteItem = this.state.todoList.filter(item => item.id !== id)
    this.setState({
      todoList: deleteItem
    }, () => { this.syncStorage() })
    this.changeAlert('deleted successfully')
  }
  deleteAll = () => {
    this.setState({
      todoList: []
    }, () => { this.deleteStorage() }
    )
    this.changeAlert('all to do has been deleted sucessfully')
  }

  // done item 
  checkItem = async id => {
    let updateItem = await this.state.todoList.find(item => item.id === id)
    this.handleCheck()
    updateItem.checked = this.state.checked
    this.syncStorage()
  }
  //handleCheck
  handleCheck = id => {
    this.setState({
      checked: !this.state.checked
    })
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

  // local storage 
  // local storage setup
  syncStorage = () => {
    localStorage.setItem('List', JSON.stringify(this.state.todoList))
  }

  getStorage = () => {
    let storedList = localStorage.getItem('List')
    if (!storedList) {
      storedList = []
      return storedList
    }
    else {
      storedList = JSON.parse(storedList)
    }

    this.setState({
      todoList: [...storedList]
    })
  }

  // delete localStorage
  deleteStorage = () => {
    localStorage.removeItem("List");
  }


  render() {
    return (
      <div className='container my-3'>
        <div className="App card my-5 rounded">
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
            checkItem={this.checkItem}
            handleCheck={this.handleCheck}
          />
        </div>
      </div>

    );
  }
}

export default App;
