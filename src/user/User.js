import React, {Component, Fragment, useEffect} from 'react';
import Spinner from "../components/layout/Spinner";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Repos from "../components/repos/Repos";


const User = ({user,loading,repos,getUser,getUserRepos,match}) => {
    //thay vì dùng life cycle thì dùng useEffect,thứ tự chạy của nó giống lifycycle
    useEffect(()=>{
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
    },[])

    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        company,
        hireable
    } = user;

    if (loading) return <Spinner/>
    return (
        <Fragment>
            <Link to='/' className="btn btn-light" >Back to search</Link>
            Hirable: {''} {hireable?<i className="fas fa-check text-success"></i>: <i className="fas fa-times-circle text-danger"></i>}
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className="round-img" alt="" style={{width:'150px'}}/>
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className="btn btn-dark my-1">View github profile</a>
                    <ul>
                        <li>{login && <Fragment>
                            <strong>Username: {login}</strong>
                        </Fragment>}</li>
                        <li>{company && <Fragment>
                            <strong>Company: {company}</strong>
                        </Fragment>}</li>
                        <li>{blog && <Fragment>
                            <strong>Website: {blog}</strong>
                        </Fragment>}</li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Follwing: {following}</div>
                <div className="badge badge-danger">Pulic Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gits: {public_gists}</div>
            </div>
            <Repos repos={repos}/>
        </Fragment>
    );
}
User.propType ={
    loading: PropTypes.bool,
    user:PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos:PropTypes.array.isRequired
}

export default User;