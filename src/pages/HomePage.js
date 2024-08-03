import React from "react";
import AboutPage from "./AboutPage";



class HomePage extends React.Component{
    constructor(){
        super();
        this.state = {
            user : [
                {
                    name : 'surya',
                    age : 23
                },
                {
                    name : 'priya',
                    age : 21
                },
                {
                    name : 'Arun',
                    age :  24
                }
            ]
        }
    }

    

    render(){
        const { user } = this.state;
       console.log(window.location.pathname.split("/"))
       console.log(window.innerWidth)
        return (
            <div>
              <p>HomePage</p>
              <AboutPage  details={user}  leaders = "Super_Admin" />
            </div>
        )
    }
}

export default HomePage;