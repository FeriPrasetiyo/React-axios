import { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheck } from '@fortawesome/free-solid-svg-icons'

export default class PhonebookForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            phone: "",
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submit({ name: this.state.name, phone: this.state.phone })
        this.setState({ name: '', phone: '' })
    }

    handleCencel = () => {
        if (!this.props.h6label) {
            this.props.cencel()
        }
        this.setState({ name: '', phone: '' })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h6>{this.props.h6label || 'Adding Form'}</h6>
                            </div>
                            <div className="card-body">
                                <div className='row justify-content-around'>
                                    <div className='col-4'>
                                        <div className="mb-3 row">
                                            <label htlmfor="name" className="col-sm-2 col-form-label">Name</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" name='name' onChange={this.handleInputChange} value={this.state.name} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="mb-3 row">
                                            <label htlmfor="phone" className="col-sm-2 col-form-label">Phone</label>
                                            <div className="col-sm-10">
                                                <input type="number" className="form-control" name='phone' onChange={this.handleInputChange} value={this.state.phone} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-1'>
                                        <div className="mb-3 row">
                                            <button type="submit" className="btn btn-success">
                                                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                                                <span>{this.props.submitLabel || 'Save'}</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col-1'>
                                        <div className="mb-3 row">
                                            <button type="button" onClick={this.handleCencel} className="btn btn-warning">
                                                <FontAwesomeIcon icon={faBan}></FontAwesomeIcon>
                                                <span>Cencel</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}