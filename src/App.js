import React,{Fragment,Component} from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Navbar from "./components/layout/Navbar";
import Users from "./user/Users";
import axios from 'axios'
import Search from "./user/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./user/User";



class App extends Component {
    state = {
        users: [],
        user:{}, //empty object
        loading: false,
        alert:null,
    }

    //foo =()=>'bars'; //đây là 1 phương thức của lớp
    // async componentDidMount() {
    //     this.setState({loading: true});
    //     const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //     this.setState({users: res.data, loading: false})
    // }

    //get single user
    getUser = async (username) => {
        this.setState({loading: true});
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({user: res.data, loading: false})
    }

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

    //set alert user no input something
    setAlert=(msg,type)=>{
        this.setState({alert:{msg:msg,type:type}});
        setTimeout(() => this.setState({alert:null},),3000)
    }

    render() {
        const {users,loading,alert,user} = this.state
        return (
            <Router>
                <div className="App">
                    <Navbar></Navbar>
                    <div className="container">
                        <Alert alert={alert}/>
                        <Switch>
                            <Route exact path="/" render={
                                props=>(
                                    <Fragment>
                                        <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}
                                                showClear={users.length > 0 ? true : false} setAlert={this.setAlert}></Search>
                                        <Users loading={loading} users={users}></Users>
                                    </Fragment>
                            )}/>
                            <Route exact path='/about' component={About}/>
                            <Route exact path='/user/:login' render={
                                props =>(
                                    <User {...props} getUser={this.getUser} user={user} loading={loading}/>
                                )
                            }/>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
        //return React.createElement('div',{className:'App'},React.createElement('h1',null,'hello react'))
    }

}

export default App;
