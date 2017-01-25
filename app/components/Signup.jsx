import React from 'react';
import {Alert} from 'react-bootstrap';

export class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      birthday: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  signupUser(e){
    e.preventDefault();
    this.props.signup(this.state.firstName, this.state.lastName, this.state.birthday, this.state.email, this.state.password)
  }

  updateInput(field, e){
    this.setState({
      [field]: e.target.value
    })
  }

  render(){
    return (
      <div className="container">
        <div className="page-header">
          <h1>Signup</h1>
        </div>
        <form className="login-form" onSubmit={this.signupUser.bind(this)}>
          <div className="buffer-oauth">
            <p>
              <a target="_self"
                 href="/api/auth/google"
                 className="btn btn-social btn-google">
              <span className="fa fa-google"></span>
              <span>Signup with Google</span>
              </a>
            </p>
          </div>
          <div className="or buffer">
            <div className="back-line">
              <span>OR</span>
            </div>
          </div>
          { this.props.warnings.signinError ? 
            (<Alert bsStyle="warning">
              <strong>Oh no!</strong> Looks like there was an issue creating your account. Try again!
            </Alert>) : null
          }
          <div className="form-group">
            <label>First Name</label>
            <input className="form-control" 
              name="firstName" 
              placeholder="first name" 
              value={this.state.firstName}
              onChange={this.updateInput.bind(this, 'firstName')} 
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input className="form-control" 
              name="lastName" 
              placeholder="last name" 
              value={this.state.lastName}
              onChange={this.updateInput.bind(this, 'lastName')} 
            />
          </div>
          <div className="form-group">
            <label>Birthday</label>
            <input className="form-control" 
              name="birthday" 
              type="date"
              value={this.state.birthday}
              onChange={this.updateInput.bind(this, 'birthday')} 
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input className="form-control" 
              name="email" 
              placeholder="email" 
              value={this.state.email}
              onChange={this.updateInput.bind(this, 'email')} 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" 
              name="password"
              type="password" 
              placeholder="password" 
              value={this.state.password}
              onChange={this.updateInput.bind(this, 'password')} 
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input className="form-control" 
              name="password"
              type="password" 
              placeholder="confirm password" 
              value={this.state.confirmPassword}
              onChange={this.updateInput.bind(this, 'confirmPassword')} 
            />
          </div>
          <button type="submit" className="btn btn-default">Signup & Login</button>
        </form> 
      </div>
    );
  }
}


import {login, signup} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'


function mapStateToProps(state){
  return {
    warnings: state.warnings
  }
}

export default connect (mapStateToProps,
  {login, signup},
) (Signup)