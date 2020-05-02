import React, {Component} from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar";
import Users from "./user/Users";
import axios from 'axios'
import Search from "./user/Search";

class App extends Component {
    state = {
        users: [],
        loading: false
    }

    //foo =()=>'bars'; //đây là 1 phương thức của lớp
    // async componentDidMount() {
    //     this.setState({loading: true});
    //     const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //     this.setState({users: res.data, loading: false})
    // }

    //search github users
    searchUsers = async text => {
        this.setState({loading: true});
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({users: res.data.items, loading: false})
    }
    //clear user from state
    clearUsers = () => {
        this.setState({users: [], loading: false})
    }

    render() {
        const {users,loading} = this.state
        return (
            <div className="App">
                <Navbar></Navbar>
                <div className="container">
                    <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}
                            showClear={users.length > 0 ? true : false}></Search>
                    <Users loading={loading} users={users}></Users>
                </div>
            </div>
        );
        //return React.createElement('div',{className:'App'},React.createElement('h1',null,'hello react'))
    }

}

export default App;
