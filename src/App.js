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
        check: false
      }
    this.handleChange = this.handleChange.bind(this)
    this.addToDo = this.addToDo.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.editList = this.editList.bind(this)
    this.submitChange = this.submitChange.bind(this)
    this.checkItem = this.checkItem.bind(this)
    this.deleteAll = this.deleteAll.bind(this)
    this.changeAlert = this.changeAlert.bind(this)
    //   this.getStorage = this.getStorage.bind(this)
    //   this.syncStorage = this.syncStorage.bind(this)
    //   this.deleteStorage = this.deleteStorage.bind(this)
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
      id: this.state.id
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
    this.changeAlert('successfully saved')

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
  checkItem = id => {
    const checkItem = this.state.todoList.find(item => item.id === id)
    const checkedList = [...this.state.checkList, checkItem]
    this.setState({
      check: !this.state.check,
      checkList: checkedList

    }, () => { this.syncStorage() })
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
    localStorage.setItem('checked', JSON.stringify(this.state.checkList))
  }

  getStorage = () => {
    let storedList = localStorage.getItem('List')
    let checkList = localStorage.getItem('checked')
    if (!storedList) {
      storedList = []
      return storedList
    }
    else {
      storedList = JSON.parse(storedList)
    }
    if (!checkList) {
      checkList = []
      return checkList
    }
    else {
      checkList = JSON.parse(checkList)
    }
    this.setState({
      todoList: [...storedList],
      checkList: [...checkList]
    })
  }

  // delete localStorage
  deleteStorage = () => {
    localStorage.removeItem("List");
    localStorage.removeItem("checked");
  }


  render() {
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
            checkItem={this.checkItem}
          />
        </div>
      </div>

    );
  }
}

export default App;

