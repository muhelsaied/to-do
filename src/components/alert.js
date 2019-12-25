import React, { Component } from 'react'
import styled from 'styled-components'

export default class Alert extends Component {
    render() {
        const { notification, color, CloseAlert } = this.props
        return (
            <AlertWrapper id = 'alert_div'>
                {
                    notification &&
                    <div className='row m-0'>
                        <div className='col-12'>
                            <div className={`alert alert-${color} my-3 p-3 text-uppercase alert-dismissible fade show`} role="alert">
                                {notification}
                                <span 
                                className='close-span'
                                onClick = {()=>CloseAlert()}>x</span>
                            </div>
                        </div>
                    </div>

                }
            </AlertWrapper>
        )
    }
}
const AlertWrapper = styled.div `
opacity: 1;
webkit-transition: 2.5s ease-in-out;
-moz-transition: 2.5s ease-in-out;
-o-transition: 2.5s ease-in-out;
transition: 2.5s ease-in-out;
.close-span {
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    // font-size: 5px;
    font-weight: 900;
    padding:.15rem .5rem;
    background: #fcfcfc;
    border-radius: 5px;
    cursor:pointer;
}
`
