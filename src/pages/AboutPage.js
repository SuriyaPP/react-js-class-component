import React from "react";


class AboutPage extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props)
    }



    render() {
        return (
            <div>
                <ul>
                    <li>{this.props.leaders}</li>
                    <li>{this.props.details.map((users , index) =>(
                        <li key={index}>{users.name} - {users.age} </li>
                    ))}</li>
                </ul>
            </div>
        )
    }
}

export default AboutPage;

