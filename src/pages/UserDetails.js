import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import '../css/Details.css';


class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: [],
            details: {
                firstName: '',
                lastName: '',
                age: '',
                mobileNumber: '',
                address: ''
            },
        };
    }

    componentDidMount() {
        this.getUserDetails();
    }

    goBack() {
        window.location.href = '/';
    }

    handlechange = (e) => {
        const { name, value } = e.target;
        this.setState(data => ({
            details: { ...data.details, [name]: value }
        }));
    }

    updateUser = () => {
        axios.put('http://localhost:8080/user/update', this.state.details)
            .then(response => {
                console.log(response.data);
                if (response.data != null) {
                    document.getElementById('isUserDetails').style.display = 'block';
                    document.getElementById('isComponent').style.display = 'none';
                    this.getUserDetails();
                }
            })
            .catch(error => {
                console.log(error.message)
            })

    }

    backToTable() {
        document.getElementById('isUserDetails').style.display = 'block';
        document.getElementById('isComponent').style.display = 'none';
    }

    handleUpdate(user) {
        this.setState({ details: user });
        document.getElementById('isUserDetails').style.display = 'none';
        document.getElementById('isComponent').style.display = 'block';
    }

    getUserDetails() {
        axios.get('http://localhost:8080/user/all')
            .then(response => {
                this.setState({ userDetails: response.data });
            })
            .catch(error => {
                console.log('Error', error.message);
            });
    }

    handleDelete = (id) => {
        let data = { userId: id };
        axios.put('http://localhost:8080/user/delete', data)
            .then(response => {
                if (response.data) {
                    Swal.fire({
                        title: "Good job!",
                        text: "User deleted successfully!",
                        icon: "success"
                    });
                    this.getUserDetails();
                }
            })
            .catch(error => {
                console.error('Error submitting data:', error.message);
            });
    }

    render() {
        const { userDetails, details } = this.state;
        return (
            <div>
                <div id="isUserDetails">
                    <h1 onClick={this.goBack}>Details</h1>
                    {userDetails.length === 0 ? (
                        <p>No users found.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userDetails.map((user) => (
                                    <tr key={user.userId}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <button className="update" onClick={() => this.handleUpdate(user)}>Update</button>
                                            <button className="delete" onClick={() => this.handleDelete(user.userId)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div id="isComponent">
                    <div>
                        <input
                            type="text"
                            name="firstName"
                            value={details.firstName || ''}
                            onChange={this.handlechange}
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="lastName"
                            value={details.lastName || ''}
                            onChange={this.handlechange}
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name="age"
                            value={details.age || ''}
                            onChange={this.handlechange}
                            placeholder="Enter your age"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name="mobileNumber"
                            value={details.mobileNumber || ''}
                            onChange={this.handlechange}
                            placeholder="Enter your mobile number"
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            name="address"
                            value={details.address || ''}
                            onChange={this.handlechange}
                            placeholder="Enter your address"
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <button className="submit_btn" onClick={this.backToTable}>Cancel</button>
                    </div>
                    <br />
                    <div>
                        <button className="submit_btn" onClick={this.updateUser}>submit</button>
                    </div>

                </div>
            </div>
        );
    }
}

export default UserDetails;
