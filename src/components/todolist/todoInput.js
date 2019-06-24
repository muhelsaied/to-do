import React, { Component } from 'react'

export default class TodoInput extends Component {
    render() {
        const {
            newItem,
            addToDo,
            handleChange,
            submitChange,
            editItem
        } = this.props
        return (
            <>
                <div className='col-12 mb-3'>
                    <input type='text'
                        className='form-control'
                        placeholder='New ToDo Item'
                        onChange={handleChange}
                        value={newItem} />
                </div>
                <div className='col-12 mb-3'>
                    <button
                        className={editItem ? 'form-control btn btn-warning ' : 'form-control btn btn-success '}
                        onClick={editItem ? submitChange : addToDo}
                        disabled={newItem ? false : true}
                    >

                        {editItem ? 'Submit Change' : 'Add To Do'}
                    </button>
                </div>

            </>
        )
    }
}
