import React, { Component } from 'react';
import { Link } from 'react-router'
import {connect} from 'react-redux'
import {logout} from '../reducers/auth'
import {DropdownButton, MenuItem} from 'react-bootstrap'

class Navbar extends Component {

  
  renderLogout(){
    return(
      <div className="nav navbar-default custom-navbar-default">
        <form className="navbar-form navbar-left">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search"/>
          </div>
        </form>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <div id="welcomeName">Hello {this.props.user.firstName}!</div>
          </li>
          <li><Link to="/chat"><span className="glyphicon glyphicon-comment"></span></Link></li>
          <li><Link to="/create-masterpiece"><span className="glyphicon glyphicon-file"></span></Link></li>
          <li>
            <div className="user-dropdown">
              <DropdownButton title={<span className="glyphicon glyphicon-user"></span>} id={`dropdown-basic-1`} className="btn-default">
                <MenuItem eventKey="1" href="/profile">
                  My Profile
                </MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey="2" onSelect={this.props.logout.bind(this)}>
                  Logout
                </MenuItem>
              </DropdownButton>
            </div>
          </li>
        </ul>
      </div>
    );

  }
  renderLoginSignup(){
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    )
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="custom-navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link id="custom-navbar-brand" className="navbar-brand" to="/gallery">
                  <span className="custom-navbar-logo-pink"><b>Draw</b></span><span className="custom-navbar-logo-orange"><b>some</b></span>
                </Link>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
               {
                this.props.user ?
                this.renderLogout():
                this.renderLoginSignup()
               }
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps, {logout})(Navbar)
