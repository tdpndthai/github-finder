import React, {useState} from 'react';
import PropTypes from 'prop-types'


const Search =({showClear,clearUsers,searchUsers,setAlert}) => {
    const [text,setText] = useState(''); //khai báo biến state ='' và 1 function setText cho text

    const onChange = (e) => {
        setText(e.target.value)
        //this.setState({text:e.target.value})
        //với trường hợp name khác text
        //this.setState({[e.target.name]:e.target.value}),name trong input là gì cũng được
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(text ===''){
            setAlert('Please enter something','light');
        }else {
            searchUsers(text);
            setText('');
        }
    }

        return (
            <div>
                <form onSubmit={onSubmit} className="form">
                    <input type="text" name="text" placeholder="Search User..." value={text}
                           onChange={onChange}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block"/>
                </form>
                {showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
            </div>
        );
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear:PropTypes.bool.isRequired,
    setAlert:PropTypes.func.isRequired,
}

export default Search;