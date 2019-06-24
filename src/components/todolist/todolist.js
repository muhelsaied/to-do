import React, { Component } from 'react'
import TodoItem from './todoItem'
import TodoInput from './todoInput'




export default class TodoList extends Component {
    render() {
        const {
            todoList,
            editItem,
            addToDo,
            handleChange,
            newItem, deleteItem,
            editList,
            submitChange,
            checkItem } = this.props
        return (
            <div className='container py-5'>
                <div className='row m-0'>

                    <TodoInput
                        handleChange={handleChange}
                        newItem={newItem}
                        addToDo={addToDo}
                        submitChange={submitChange}
                        editItem={editItem} />
                    <div className='col-12 text-capitalize'>
                        <h4 className='text-uppercase text-light bg-secondary rounded py-3 my-4'>
                            to do list
                        </h4>
                        {
                            !editItem &&
                            <ul className='list-group'>
                                {todoList.map(
                                    item => {
                                        return (
                                            <TodoItem key={item.id}
                                                text={item.text}
                                                deleteItem={() => deleteItem(item.id)}
                                                editList={() => editList(item.id)}
                                                checkItem={() => checkItem(item.id)}
                                                checked={item.checked}
                                            />
                                        )
                                    })}
                            </ul>

                        }
                    </div>
                </div>
            </div >
        )
    }
}

