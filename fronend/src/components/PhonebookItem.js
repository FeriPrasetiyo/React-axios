import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Component } from 'react'

export default class PhonebookItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.user.name,
            phone: props.user.phone,
            isEdit: false
        }
    }


    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }

    handleEdit = () => {
        this.setState({
            isEdit: true
        })
    }

    handleCencel = () => {
        this.setState({
            name: this.props.user.name,
            phone: this.props.user.phone,
            isEdit: false
        })
    }

    saveEdit = () => {
        this.props.update({ id: this.props.user.id, name: this.state.name, phone: this.state.phone })
        this.setState({ isEdit: false })
    }

    render() {
        return (
            <tr>
                <td>{this.props.no}</td>
                <td>
                    {this.state.isEdit ?
                        <input className='form-control' type='text' name='name' value={this.state.name} placeholder='masukan name' onChange={this.handleInputChange} />
                        :
                        this.state.name
                    }
                </td>
                <td>
                    {this.state.isEdit ?
                        <input className='form-control' type='number' name='phone' value={this.state.phone} placeholder='masukan name' onChange={this.handleInputChange} />
                        :
                        this.state.phone
                    }
                </td>
                {
                    this.props.user.sent ?
                        this.state.isEdit ?
                            <td>
                                <div className="row">
                                    <div className="col-sm-5">
                                        <button type="button" className="btn btn-info" onClick={this.saveEdit}>
                                            <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                                            <span>Save</span>
                                        </button>
                                    </div>
                                    <div className="col-sm-6">
                                        <button className="btn btn-warning" type="button"
                                            onClick={this.handleCencel}>
                                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                            <span>Cencel</span>
                                        </button>
                                    </div>
                                </div>
                            </td>
                            :
                            <td>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-success" onClick={this.handleEdit}>
                                            <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                                            <span>Edit</span>
                                        </button>
                                    </div>
                                    <div className="col-sm-4">
                                        <button className="btn btn-danger" type="button"
                                            onClick={this.props.remove}>
                                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        :
                        <td>
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-warning" type="button"
                                        onClick={this.props.resend}>
                                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                        <span>resend</span>
                                    </button>
                                </div>
                            </div>
                        </td>
                }
            </tr >
        )
    }
}
