import React, {Component} from 'react';
import {Link} from 'react-router'
import axios from 'axios'
import SearchInput, {createFilter} from 'react-search-input'


export class SearchBar extends Component {
  constructor(){
    super()
    this.state = {
      input:'',
      nameArr: []
    }
    this.axiosCall = this.axiosCall.bind(this);
    this.searchUpdate = this.searchUpdate.bind(this);
  }

  axiosCall(name){
    axios.get(`/api/users/search/${name}`)
    .then(names=> this.setState({nameArr:names}))
  }


  searchUpdate(e){
    let val = e.target.value;
    this.setState({
      input: val
    })
    this.axiosCall(this.state.input);
  }


  render() {

        return (
          <div>
          <input type="text"
            className="form-control"
            name="searchTerm"
            placeholder="Search for friends"
            value={this.state.input}
            onChange={ this.searchUpdate} />
          { this.state.nameArr.map(name => {
            return (
              <div className="name" key={name}>{name}</div>
            )
          })}
          </div>
        )

    }
}
