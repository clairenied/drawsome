import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router'
import axios from 'axios'


export class SearchBar extends Component {
  constructor(){
    super()
    this.state = {
      input:"",
      nameArr: []
    }
    this.axiosCall = this.axiosCall.bind(this);
    this.searchUpdate = this.searchUpdate.bind(this);
    this.linkClick = this.linkClick.bind(this)
  }

  axiosCall(name){
    axios.get(`/api/users/searchbar/`, { params: { name } })
    .then(names => {
      this.setState({ nameArr: names.data })
    })
  }

  searchUpdate(e){
    let val = e.target.value;
    this.setState({
      input: val,
      nameArr: val ? this.state.nameArr: []
    })
      if(val){
      this.axiosCall(val);
    }
  }

  linkClick(name){
    this.setState({input:"", nameArr:[]})
    browserHistory.push(`/profile/${name.id}`)
  }


  render() {
    return (
      <div className="searchStyle">
        <input
          type="text"
          className="form-control"
          name="searchTerm"
          placeholder="Search for friends"
          autoComplete="off"
          autoCorrect="off"
          value={this.state.input}
          onChange={ this.searchUpdate} />

        { this.state.nameArr.map(name => {
          return (
            <div className="resultStyle" key={name.email}>
            <a onClick={()=> this.linkClick(name)}>{name.fullName}</a>
            </div>
          )
        })}
      </div>
    )
  }
}
