import React, { Component } from 'react';
import './App.css';
import Uuid from 'uuid'
// import logo from './bcg-1.png'
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
    this.CloseAlert = this.CloseAlert.bind(this)
    this.alertTimer = this.alertTimer.bind(this)
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
    this.alertTimer()
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
    console.log(updateItem.text,this.state.newItem);
    if (updateItem.text === this.state.newItem) {
        this.changeAlert('no change had been maded','danger') 
        this.alertTimer() 
    }  
    else{
        updateItem.text = this.state.newItem
            this.changeAlert('changed successfully ', 'warning')
            this.alertTimer()
            this.setState({
              newItem: '',
              editItem: false,
              id: Uuid()
            }, () => { this.syncStorage() })
      }
    
    

  }


  // delete item 
  deleteItem = (id) => {
    const deleteItem = this.state.todoList.filter(item => item.id !== id)
    this.setState({
      todoList: deleteItem,
      checked: false
    }, () => { this.syncStorage() })
    this.changeAlert('deleted successfully', 'danger')
    this.alertTimer()
  }
  deleteAll = () => {
    this.setState({
      todoList: []
    }, () => { this.deleteStorage() }
    )
    this.changeAlert('all to do has been deleted sucessfully', 'danger')
    this.alertTimer()
  }

  // done item 
  checkItem = (id) => {
    let updateItem = this.state.todoList.find(item => item.id === id)
    // this.handleCheck()
      //handleCheck
    this.setState({
      checked: !this.state.checked
    })
    updateItem.checked = !this.state.checked
    this.syncStorage()
  }
  //handleCheck
  // handleCheck = id => {
  //   this.setState({
  //     checked: !this.state.checked
  //   })
  // }

  // disable enter key 
  onKeyPress = (event) => {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
      this.changeAlert("please fill your to do list", "warning")
      this.alertTimer()
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
    const alertWrapper = document.querySelector('#alert_div');
    alertWrapper.style.opacity = 1;
    alertWrapper.style.height = "5%";
    alertWrapper.style.transform = "rotate(0)";
    this.setState({
      notification,
      color
    })
    
  }

  // set timer for alert 
  alertTimer = () => setTimeout(() => {
      // this.setState({
      //   notification: null,
      //   color: null
      // })
      const alertWrapper = document.querySelector('#alert_div');
      alertWrapper.style.opacity = 0;
      alertWrapper.style.height = 0;
      alertWrapper.style.transform = "rotate(-360deg)";
    }, 5000)
// alert close  button
  
CloseAlert  = ()=> {
  const alertWrapper = document.querySelector('#alert_div');
  alertWrapper.style.opacity = 0;
  alertWrapper.style.height = 0;
  alertWrapper.style.transform = "rotate(-360deg)";
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
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h3>
              {
              new Date().toDateString()
              }
            </h3>
            
            
          </header>
          <div className='container py-2'>
                    <Alert
                      {
                      ...this.state
                      }
                      CloseAlert = {this.CloseAlert}/>
                      </div>
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
