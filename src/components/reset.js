import React, { Component } from 'react'
import styled from 'styled-components'
import { MdCached } from 'react-icons/md'


export default class TodoLResetist extends Component {
    render() {
        const { deleteAll } = this.props
        return (
            <DeleteWrapper className='btn btn-danger'>
                <MdCached
                    onClick={deleteAll} />
            </DeleteWrapper>
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