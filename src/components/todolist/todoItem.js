import React, { Component } from 'react'
import styled from 'styled-components'
import { MdModeEdit, MdDeleteForever, MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md'

export default class TodoItem extends Component {
    render() {
        const { text, deleteItem, editList, checkItem, check } = this.props
        return (
            <>
                <ListWrapper className='list-group-item' >
                    <span className='p-2 '>
                        <i className='btn'
                            onClick={checkItem}>
                            {
                                check ?
                                    <MdCheckCircle
                                        className='icon' /> :
                                    <MdRadioButtonUnchecked
                                        className='icon' />
                            }
                        </i>
                    </span>

                    <span className='col-6 text'>{text}</span>
                    <span className='p-2' >
                        <i className='btn btn-primary'>
                            <MdModeEdit
                                className='icon'
                                onClick={editList} />
                        </i>
                    </span>
                    <span className='p-2 '>
                        <i className='btn btn-danger'>
                            <MdDeleteForever
                                onClick={deleteItem}
                                className='icon' />
                        </i>
                    </span>

                </ListWrapper>
            </>
        )
    }
}

const ListWrapper = styled.li`
display:flex;
flex-direction:row;
justify-content:space-around;
align-items:center;
.text{
    text-align:center;
    word-break: break-word;
}

.icon{
    font-size:30px;
}
@media (max-width:500px) {
    span{
        padding:.2rem !important;
    }
    .icon{
    font-size:18px;
}
}
`