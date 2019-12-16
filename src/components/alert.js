import React, { Component } from 'react'

export default class Alert extends Component {
    render() {
        const { notification, color } = this.props
        return (
            <>
                {
                    notification &&
                    <div className='row m-0'>
                        <div className='col-12'>
                            <div className={`alert alert-${color} my-3 text-uppercase alert-dismissible fade show`} role="alert">
                                {notification}
                            </div>
                        </div>
                    </div>

                }
            </>
        )
    }
}
