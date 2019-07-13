import React, { Component } from 'react'
import styled from 'styled-components'
import { MdCached } from 'react-icons/md'


export default class Reset extends Component {
    render() {
        const { resetProgress, todoList } = this.props
        return (
            <ResetWrapper className='btn btn-warning'
                onClick={resetProgress}
            >
                <MdCached />
            </ResetWrapper >
        )
    }
}
const ResetWrapper = styled.button`
    position: absolute;
    top: 3%;
    left: 5%;
    font-size:25px;
    font-weight:600
`