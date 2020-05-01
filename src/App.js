import React, {Component} from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar";
import UserItem from "./user/UserItem";
import Users from "./user/Users";

class App extends Component{
  //foo =()=>'bars'; //đây là 1 phương thức của lớp
  render(){
    const name ='danh thai';
    const loading = false;
    // if (loading){
    //     return  <h3>Loading...</h3>
    // }
    const number=[1,2,3,4]
    return (
        <div className="App">
          {/*<h1>Hello React {name.toUpperCase()}</h1>*/}
          {/*/!*<h2>Hello {this.foo()}</h2>*!/*/}
          {/*  {loading ? <h3>Loading...</h3>: <h3>Hello {name}</h3>}*/}
          <Navbar></Navbar>
            {/*<UserItem></UserItem>*/}
            <div className="container">
                <Users></Users>
            </div>
        </div>
    );
    //return React.createElement('div',{className:'App'},React.createElement('h1',null,'hello react'))
  }

}

export default App;
