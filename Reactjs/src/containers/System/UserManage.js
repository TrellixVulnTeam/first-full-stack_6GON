import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
import ModalUser from "./ModalUser";

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModelUser: false
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModelUser: true
        })
    }

    toggleModalUser = () => {
        this.setState({
            isOpenModelUser: !this.state.isOpenModelUser
        })
    }
    render() {
        console.log(">>> Check render", this.state)
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-containter">
                <ModalUser
                    isOpen={this.state.isOpenModelUser}
                    toggleFromParent={this.toggleModalUser}
                    test="abc"
                />
                <div className="title text-center">Manage Users</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i>
                        Add new user
                    </button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit"><i className="fas fa-edit"></i></button>
                                            <button className="btn-delete"><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                        }

                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
