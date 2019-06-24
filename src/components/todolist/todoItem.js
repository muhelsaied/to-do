import React, { Component } from 'react'
import styled from 'styled-components'
import { MdModeEdit, MdDeleteForever, MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md'

export default class TodoItem extends Component {
    render() {
        const { text, deleteItem, editList, checkItem, checked } = this.props
        return (
            <>
                <ListWrapper className='list-group-item' checked={checked} >
                    <span className='p-1 '>
                        <i
                            className={checked ?
                                'btn btn-warning text-white' :
                                'btn btn-primary text-white'}>
                            {
                                checked ?
                                    <MdCheckCircle
                                        onClick={checkItem}
                                        className='icon' /> :
                                    <MdRadioButtonUnchecked
                                        onClick={checkItem}
                                        className='icon' />
                            }
                        </i>
                    </span>
                    {
                        checked ?
                            <span className='col-6 text text-warning'>{text}</span>
                            :
                            <span className='col-6 text text-primary'>{text}</span>
                    }

                    <span className='p-1' >
                        <i className={
                            checked ?
                                'btn btn-warning' :
                                'btn btn-primary'
                        }>
                            <MdModeEdit
                                className='icon'
                                onClick={editList} />
                        </i>
                    </span>
                    <span className='p-1 '>
                        <i className=
                            {
                                checked ?
                                    'btn btn-warning' :
                                    'btn btn-danger'
                            }>
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
text-decoration: ${props => props.checked ? 'line-through' : 'capitalize'};
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