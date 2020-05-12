import React, {Fragment, Component, useState} from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Navbar from "./components/layout/Navbar";
import Users from "./user/Users";
import axios from 'axios'
import Search from "./user/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./user/User";
import GithubState from "./context/github/GithubState";

const App = () => {
    const [users,setUsers] = useState([]);
    const [user,setUser] = useState({});
    const [loading,setLoading] = useState(false);
    const [alert,setAlert] = useState(null);
    const [repos,setRepos] = useState([]);

    //get user repos
    const getUserRepos = async (username) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setRepos(res.data);
        setLoading(false)
    }

    //get single user
    const getUser = async (username) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setUser(res.data);
        setLoading(false);
    }

    //search github users
    const searchUsers = async text => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        //this.setState({users: res.data.items, loading: false})
        setUsers(res.data.items);
        setLoading(false);
    }
    //clear user from state
    const clearUsers = () => {
        setUsers([])
        setLoading(false)
    }

    //set alert user no input something
    const setAlertMsg=(msg,type)=>{
        setAlert({msg,type});
        setTimeout(() => setAlert(null),3000)
    }

    return (
        <GithubState>
            <Router>
                <div className="App">
                    <Navbar></Navbar>
                    <div className="container">
                        <Alert alert={alert}/>
                        <Switch>
                            <Route exact path="/" render={
                                props=>(
                                    <Fragment>
                                        <Search searchUsers={searchUsers} clearUsers={clearUsers}
                                                showClear={users.length > 0 ? true : false} setAlert={setAlertMsg}></Search>
                                        <Users loading={loading} users={users}></Users>
                                    </Fragment>
                                )}/>
                            <Route exact path='/about' component={About}/>
                            <Route exact path='/user/:login' render={
                                props =>(
                                    <User {...props} getUser={getUser} user={user} loading={loading} getUserRepos={getUserRepos} repos={repos}/>
                                )
                            }/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </GithubState>

    );
}

export default App;
