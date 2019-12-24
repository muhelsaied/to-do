import React, { Component } from 'react'
import { FaBook } from 'react-icons/fa'
export default class TodoInput extends Component {
    render() {
        const {
            newItem,
            addToDo,
            handleChange,
            submitChange,
            editItem,
            onKeyPress
        } = this.props
        return (
            <div className='col-12 mb-3'>
                <form onSubmit={editItem ? submitChange : addToDo}
                    onKeyPress={newItem ? console.log('pass') : onKeyPress}>
                    {/* // onKeyPress={onKeyPress}> */}
                    <div className='container text-light text-uppercase p-2 bg-danger mt-3 mb-2'>
                        <h5>{editItem ? 'change item' : 'Input item'}</h5>
                    </div>
                    <div className='input-group'>
                        <div className='input-group-prepend'>
                            <div className='input-group-text bg-danger text-light'>
                                <i className=''>
                                    <FaBook />
                                </i>
                            </div>
                        </div>
                        <input
                            className='form-control text-capitalize '
                            placeholder='Add To Do To Your List'
                            value={newItem}
                            onChange={handleChange}
                        >
                        </input>
                    </div>
                    <button type="button"
                        className={editItem ? "btn btn-block btn-success text-uppercase mt-3 active" :
                            "btn btn-block btn-secondary text-uppercase mt-3 active"}
                        onClick={editItem ? submitChange : addToDo}
                        disabled={newItem ? false : true}
                    >
                        {editItem ? "done" : "add item"}

                    </button>
                </form>
            </div>
        )
    }
}
