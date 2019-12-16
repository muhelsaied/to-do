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
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    </div>

                }
            </>
        )
    }
}
