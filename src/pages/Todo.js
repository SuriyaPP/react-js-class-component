import React from "react";

class Todo extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            list: ""
        };
    }

    handleItems = (e) => {
        this.setState({ list: e.target.value });
    }

    addItems = () => {
        if (this.state.list) {
            this.setState(prevState => ({
                items: [...prevState.items, prevState.list],
                list: ""
            }));
        } else {
            console.log('error');
        }
    }

    render() {
        const { items, list } = this.state;
        return (
            <div>
                <h1>Todo List</h1>
                <div>
                    <input 
                        type="text" 
                        value={list}  
                        onChange={this.handleItems} 
                        placeholder="Add item..." 
                    />
                </div>
                <div>
                    <button type="button" onClick={this.addItems}>Add Item</button>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item}</td>
                                    <td>
                                        <button type="button" >Edit</button>
                                        <button type="button">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Todo;
