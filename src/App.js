import React, { Component } from 'react';
import './App.css';
import Uuid from 'uuid'
import logo from './bcg-1.png'
// bootstrap
import BootStrap from 'bootstrap/dist/css/bootstrap.min.css'


import TodoList from './components/todolist/todolist'
import Reset from './components/reset'
import Alert from './components/alert'
// import ResetProgress from './components/resetProgress'

class App extends Component {
  constructor() {
    super()
    this.state =
      {
        newItem: '',
        todoList: [],
        id: Uuid(),
        notification: null,
        color: null,
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
    // this.handleCheck = this.handleCheck.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.resetProgress = this.resetProgress.bind(this)
  }


  //compenent 
  componentDidMount() {
    this.getStorage()
  }

  //  change input 
  handleChange = (event) => {
    console.clear()
    this.setState({
      newItem: event.target.value
    })

  }

  //  add new to do list 
  addToDo = (event) => {
    event.preventDefault()
    const newItem = {
      text: this.state.newItem,
      id: this.state.id,
      checked: false
    }
    const newList = [...this.state.todoList, newItem]
    this.setState({
      todoList: newList,
      newItem: '',
      id: Uuid()
    }, () => { this.syncStorage() })
    this.changeAlert('created successfully', 'success')
  }

  // update list 
  editList = (id) => {
    const editItem = this.state.todoList.find(item => item.id === id)
    this.setState({
      newItem: editItem.text,
      editItem: true,
      id: id,
      checked: this.state.checked
    })
  }
  submitChange = (event) => {
    event.preventDefault()
    let updateItem = this.state.todoList.find(item => item.id === this.state.id)
    updateItem.text = this.state.newItem
    this.setState({
      newItem: '',
      editItem: false,
      id: Uuid()
    }, () => { this.syncStorage() })
    this.changeAlert('changed successfully ', 'warning')

  }


  // delete item 
  deleteItem = (id) => {
    const deleteItem = this.state.todoList.filter(item => item.id !== id)
    this.setState({
      todoList: deleteItem,
      checked: false
    }, () => { this.syncStorage() })
    this.changeAlert('deleted successfully', 'danger')
  }
  deleteAll = () => {
    this.setState({
      todoList: []
    }, () => { this.deleteStorage() }
    )
    this.changeAlert('all to do has been deleted sucessfully', 'danger')
  }

  // done item 
  checkItem = (id) => {
    let updateItem = this.state.todoList.find(item => item.id === id)
    // this.handleCheck()
      //handleCheck
    this.setState({
      checked: !this.state.checked
    })
    updateItem.checked = this.state.checked
    this.syncStorage()
  }
  //handleCheck
  // handleCheck = id => {
  //   this.setState({
  //     checked: !this.state.checked
  //   })
  // }

  // disable form 
  onKeyPress = (event) => {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }

  //reset progress
  resetProgress = () => {
    let list = [...this.state.todoList]
    list.forEach(item => {
      item.checked = false
    })
    this.setState({
      todoList: list
    })
    this.syncStorage()
  }
  //  alert func
  changeAlert = (notification, color) => {
    this.setState({
      notification,
      color
    })
    setTimeout(() => {
      this.setState({
        notification: null,
        color: null
      })
    }, 3500)
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
        <div className="App card rounded">
          {/* <ResetProgress
            {
            ...this.state
            }
            resetProgress={this.resetProgress} /> */}
          <Reset
            {
            ...this.state
            }
            deleteAll={this.deleteAll} />
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {
              new Date().toDateString()
            }
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
            onKeyPress={this.onKeyPress}
          />
        </div>
      </div>

    );
  }
}

export default App;

