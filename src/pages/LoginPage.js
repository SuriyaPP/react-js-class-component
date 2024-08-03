import React from "react";
import '../css/Login.css'

export default class LoginPage extends React.Component{
  constructor(){
    super();
    this.state = {
      count : 0
    }
  }

   increment = () => {
    this.setState({ count : this.state.count + 1 })
   }

   decrement = () => {
    this.setState ({ count : this.state.count - 1 })
   }

    render(){
      const { count } = this.state;
      return (
        <div>
           <h1>Count</h1>
           <p>{ this.state.count }</p>
           <button className="increment-btn" type="button" onClick={this.increment}>countIncrement</button>
           <button className="decrement-btn" type="button" onClick={this.decrement}>countDecrement </button>
        </div>
      )
    }

}

// export default LoginPage;