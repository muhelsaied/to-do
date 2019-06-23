import React, { Component } from 'react'

export default class Alert extends Component {
    render() {
        const { notification } = this.props
        return (
            <>
                {
                    notification &&
                    <div className='row m-0'>
                        <div className='col'>
                            <div className="alert alert-success my-3 text-uppercase" role="alert">
                                {notification}
                            </div>
                        </div>
                    </div>

                }
            </>
        )
    }
}
