import React, { Component } from 'react'
import styled from 'styled-components'
import { MdModeEdit, MdDeleteForever, MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md'

export default class TodoItem extends Component {
    render() {
        const { text, deleteItem, editList, checkItem, checked } = this.props
        return (
            <>
                <ListWrapper className='list-group-item my-1'
                    show={checked}>
                    <span className='p-1 '
                    onClick={() => checkItem ()}
                    >
                        <i>
                            {
                                checked ?
                                    <MdCheckCircle
                                        className='icon' /> :
                                    <MdRadioButtonUnchecked
                                        className='icon' />
                            }
                        </i>
                    </span>
                    {
                        checked ?
                            <span className='col-6 text '>{text}</span>
                            :
                            <span className='col-6 text '>{text}</span>
                    }

                    <span className='p-1 btn ' >
                        <i className='text-primary'>
                            <MdModeEdit
                                className='icon'
                                onClick={editList} />
                        </i>
                    </span>
                    <span className='p-1  btn '>
                        <i className='text-danger'>
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
cursor: pointer;
.p-1{
    border-radius:50% !important;
    background:${props => props.show ? '#eee' : '#e0e7bb'};
}
background-color:${props => props.show ? '#d4edda' : '#f3f3f3'}; 
color:${props => props.show ? '#155724' : '#0a7aea'};
border-color:${props => props.show ? '#c3e6cb' : '#f3f3f3'}; 
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
    font-size:25px;
}
}
`