import { Component } from 'react'
import axios from 'axios'
import PhonebookForm from './PhonebookForm'
import PhonebookList from './PhonebookList'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default class Phonebook extends Component {

    constructor(props) {
        super(props);
        this.params = {
            page: 1,
            pages: 1,
            name: ''
        }
        this.state = {
            users: [],
            showAdd: false,
        }
    }

    componentDidMount() {
        this.loadUser()
    }

    loadUser = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/users',
            params: this.params
        }).then((data) => {
            this.params.page = data.data.data.page
            this.params.pages = data.data.data.pages
            this.setState(state => ({
                users: [...(this.params.page === 1 ? [] : state.users), ...data.data.data.users.map(item => {
                    item.sent = true
                    return item
                })]
            }))
        }).catch((error) => {
            console.log(error)
        })
    }

    addUser = ({ name, phone }) => {
        const id = Date.now()
        this.setState(function (state) {
            return {
                users: [
                    ...state.users,
                    {
                        id,
                        name,
                        phone,
                        sent: true
                    }]
            }
        })
        axios.post('http://localhost:3000/users', {
            name,
            phone
        }).then((data) => {
            this.setState(function (state) {
                return {
                    users:
                        state.users.map(item => {
                            if (item.id === id) {
                                return {
                                    id: data.data.data.id,
                                    name: data.data.data.name,
                                    phone: data.data.data.phone,
                                    sent: true
                                }
                            }
                            return item
                        })
                }
            })
        }).catch(() => {
            this.setState(function (state) {
                return {
                    users:
                        state.users.map(item => {
                            if (item.id === id) {
                                return { ...item, sent: false }
                            }
                            return item
                        })
                }
            })
        });
    }

    removeUser = (id) => {
        axios({
            method: 'delete',
            url: `http://localhost:3000/users/${id}`,
        }).then((data) => {
            this.setState((state) => {
                return {
                    users: state.users.filter(users => users.id !== id)
                }
            });
        }).catch(function (error) {
            console.log(error)
        })

    }

    updateUser = ({ id, name, phone }) => {
        axios.put(`http://localhost:3000/users/${id}`, {
            name,
            phone
        }).then((data) => {
            this.setState(function (state) {
                return {
                    users:
                        state.users.map(item => {
                            if (item.id === id) {
                                return {
                                    id: data.data.data.id,
                                    name: data.data.data.name,
                                    phone: data.data.data.phone,
                                    sent: true
                                }
                            }
                            return item
                        })
                }
            })
        }).catch(() => {
            this.setState(function (state) {
                return {
                    users:
                        state.users.map(item => {
                            if (item.id === id) {
                                return { ...item, sent: false }
                            }
                            return item
                        })
                }
            })
        });
    }

    resendUser = ({ id, name, phone }) => {
        axios.post('http://localhost:3000/users', {
            name,
            phone
        }).then(data => {
            this.setState(state => ({
                users: [...state.users, ...data.data.data.users.map(item => {
                    item.sent = true
                    return item
                })]
            }))
            this.params.pages = data.data.data.pages
        }).catch((error) => {
            console.log(error)
        });
    }

    hiddtenAddUser = () => {
        this.setState({
            showAdd: false
        })
    }

    showAddUser = () => {
        this.setState({
            showAdd: true
        })
    }

    searchUser = (query) => {
        this.params = { ...this.params, ...query, page: 1 }
        this.loadUser()
    }

    loadMore = () => {
        if (this.params.page <= this.params.pages) {
            this.params = {
                ...this.params,
                page: this.params.page + 1
            }
            this.loadUser()
        }
    }



    render() {
        return (
            <div className="container-md" >
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h1 className="text-center">Phonebook Book Apps</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className='row'>
                    <div className='col'>
                        <button type="button" className='btn btn-primary' onClick={() => this.showAddUser()}>
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                            <span>add</span>
                        </button>
                    </div>
                </div>
                <br />
                <div className='row'>
                    {
                        this.state.showAdd ? <PhonebookForm submit={this.addUser} cencel={this.hiddtenAddUser} /> : null
                    }
                </div>
                <br></br>
                <div className="row">
                    <div className="col">
                        <PhonebookForm submit={this.searchUser} submitLabel="Search" h6label="Search Form" />
                    </div>
                </div >
                <br></br>
                <div className="row">
                    <div className='col'>
                        <PhonebookList
                            data={this.state.users}
                            remove={this.removeUser}
                            resend={this.resendUser}
                            update={this.updateUser}
                            loadMore={this.loadMore}
                        />
                    </div>
                </div>
                <div className='col'>
                </div>
            </div >
        )
    }
}