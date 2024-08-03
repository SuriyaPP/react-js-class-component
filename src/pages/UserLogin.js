import React from "react";
import '../css/UserLogin.css';
import axios from "axios";
import Swal from "sweetalert2";

class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                age: 0,
                mobileNumber: '',
                address: ''
            },
            errors: {
                firstName: '',
                mobileNumber: '',
            }
        };
    }

    handlechange = (e) => {
        const { name, value } = e.target;
        let errors = this.state.errors;

        switch (name) {
            case 'firstName':
                errors.firstName = 
                    value.length < 5 
                        ? 'First name must be at least 5 characters long!'
                        : '';
                break;
            case 'mobileNumber':
                errors.mobileNumber = 
                    value.length < 10  || value.length > 10
                        ? 'please Enter Your Mobile number!'
                        : '';
                break;
            default:
                break;
        }

        this.setState(prevState => ({
            user: { ...prevState.user, [name]: value },
            errors: errors
        }));
    }

    submitDetails = (e) => {
        document.getElementById('submit_btn').disabled = true;
        document.getElementById('submit_btn').style.cursor = 'no-drop';
        e.preventDefault();
        
        axios.post('http://localhost:8080/user/insert', this.state.user)
            .then(response => {
                console.log(response.data);
                if (response.data) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Data submitted successfully!",
                        icon: "success"
                    });
                    this.setState({
                        user: { 
                            firstName: '', 
                            lastName: '', 
                            age: 0, 
                            mobileNumber: '', 
                            address: '' 
                        }
                    });
                }
                document.getElementById('submit_btn').disabled = false;
                document.getElementById('submit_btn').style.cursor = 'pointer';
            })
            .catch(error => {
                console.error('Error submitting data:', error.message);
                document.getElementById('submit_btn').disabled = false;
                document.getElementById('submit_btn').style.cursor = 'pointer';
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong.",
                    icon: "error"
                });
            });
    }

    render() {
        const { user, errors } = this.state;
        return (
            <div>
                <div className="login">
                    <form onSubmit={this.submitDetails}>
                        <div>
                            <input 
                                className={errors.firstName ? 'error' : 'success'} 
                                type="text" 
                                name="firstName" 
                                value={user.firstName} 
                                onChange={this.handlechange} 
                                placeholder="Enter your first name"  
                                required
                            />
                            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                        </div>
                        <div>
                            <input 
                                className="success" 
                                type="text" 
                                name="lastName" 
                                value={user.lastName} 
                                onChange={this.handlechange} 
                                placeholder="Enter your last name" 
                                required
                            />
                        </div>
                        <div>
                            <input 
                                className="success" 
                                type="number" 
                                name="age" 
                                value={user.age} 
                                onChange={this.handlechange} 
                                placeholder="Enter your age" 
                                required
                            />
                        </div>
                        <div>
                            <input 
                                className={errors.mobileNumber ? 'error' : 'success'} 
                                type="number" 
                                name="mobileNumber" 
                                value={user.mobileNumber} 
                                onChange={this.handlechange} 
                                placeholder="Enter your mobile no" 
                                required
                            />
                            {errors.mobileNumber && <span className="error-message">{errors.mobileNumber}</span>}
                        </div>
                        <div>
                            <textarea 
                                className="success" 
                                name="address" 
                                value={user.address} 
                                onChange={this.handlechange} 
                                placeholder="Enter your address" 
                                required
                            />
                        </div>
                        <div>
                            <input className="submit_btn" type="submit" id="submit_btn" value="Submit" />
                        </div>
                    </form>
                </div>         
            </div>
        );
    }
}

export default UserLogin;
