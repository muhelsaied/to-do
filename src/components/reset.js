import React, { Component } from 'react'
import styled from 'styled-components'
import { MdCached } from 'react-icons/md'


export default class TodoLResetist extends Component {
    render() {
        const { deleteAll, editItem, todoList } = this.props
        return (
            <DeleteWrapper className='btn btn-danger'
                onClick={deleteAll}
                disabled={
                    editItem ? true : false ||
                        !todoList || todoList.length === 0 ? true : false
                }>
                <MdCached />
            </DeleteWrapper >
        )
    }
}
const DeleteWrapper = styled.button`
    position: absolute;
    top: 3%;
    right: 5%;
    font-size:25px;
    font-weight:600
`