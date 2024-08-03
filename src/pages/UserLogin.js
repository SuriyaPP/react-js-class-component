import React from "react";
import '../css/UserLogin.css'
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
            }
        };
    }


    handlechange = (e) => {
        const { name, value } = e.target;
        this.setState(data => ({
            user: { ...data.user , [name] : value }
        }));
    }

    submitDetails = (e) => {
        document.getElementById('submit_btn').disabled = true;
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
            })
            .catch(error => {
                console.error('Error submitting data:', error.message);
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong.",
                    icon: "error"
                });
            });
    }
    

    render() {
        const { user } = this.state;
        return (
            <div>
                <div className="login">
                    <form onSubmit={this.submitDetails}>
                        <div>
                            <input 
                                className={user.firstName ? 'success' : 'error'} 
                                type="text" 
                                name="firstName" 
                                value={user.firstName} 
                                onChange={this.handlechange} 
                                placeholder="Enter your first name"  
                                required
                            />
                        </div>
                        <div>
                            <input 
                             className={user.lastName ? 'success' : 'error'} 
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
                            className={user.age ? 'success' : 'error'} 
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
                             className={user.mobileNumber ? 'success' : 'error'} 
                                type="number" 
                                name="mobileNumber" 
                                value={user.mobileNumber} 
                                onChange={this.handlechange} 
                                placeholder="Enter your mobile no" 
                                required
                            />
                        </div>
                        <div>
                            <textarea 
                            className={user.address ? 'success' : 'error'} 
                                name="address" 
                                value={user.address} 
                                onChange={this.handlechange} 
                                placeholder="Enter your address" 
                                required
                            />
                        </div>
                        <div>
                            <input className="submit_btn" type="submit" id="submit_btn" ></input>
                        </div>
                    </form>
                </div>         
            </div>
        )
    }
}

export default UserLogin;
