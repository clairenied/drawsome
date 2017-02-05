import React from 'react';
import {Alert} from 'react-bootstrap';

export class Signup extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dirtyList: {},
      firstName: '',
      lastName: '',
      birthday: '',
      email: '',
      password: '',
      confirmPassword: '',
      submit:true,
    }
    this.emailValidate = this.emailValidate.bind(this);
    this.fieldsFilled = this.fieldsFilled.bind(this);
    this.passwordMatch = this.passwordMatch.bind(this);
  }

  emailValidate() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
      return (true)
    }
      return (false)
}
  fieldsFilled() {
    if (this.state.firstName !== '' & this.state.lastName !== '' & this.state.email !== '' & this.state.password !== ''){
      return true
    }
      return false
  }

  passwordMatch() {
    if (this.state.password === this.state.confirmPassword){
      return true
    }
    return false
  }

  signupUser(e){
    e.preventDefault();
    if(this.fieldsFilled() && this.emailValidate() && this.passwordMatch()){
      this.props.signup(this.state.firstName, this.state.lastName, this.state.birthday, this.state.email, this.state.password)
    }
    this.setState({submit:false})
  }

  updateInput(field, e){
    this.setState({
      [field]: e.target.value,
      dirtyList: {
        ...this.state.dirtyList,
        [field]: true
      }
    })
  }

  showRequiredMessage(field) {
    return this.state.dirtyList[field] && !this.state[field]
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
              <strong>That email is already registered. Use a different one or login</strong>
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
          { this.showRequiredMessage('firstName') ?
            <p style={{color:'red'}}>First name required.</p>
          :
            null
          }
          <div className="form-group">
            <label>Last Name</label>
            <input className="form-control"
              name="lastName"
              placeholder="last name"
              value={this.state.lastName}
              onChange={this.updateInput.bind(this, 'lastName')}
            />
          </div>
          { this.showRequiredMessage('lastName') ?
            <p style={{color:'red'}}>Last name required.</p>
          :
            null
          }
          <div className="form-group">
            <label>Birthday</label>
            <input className="form-control"
              name="birthday"
              type="date"
              value={this.state.birthday}
              onChange={this.updateInput.bind(this, 'birthday')}
            />
          </div>
          { this.showRequiredMessage('birthday') ?
            <p style={{color:'red'}}>Birthday required.</p>
          :
            null
          }
          <div className="form-group">
            <label>Email Address</label>
            <input className="form-control"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.updateInput.bind(this, 'email')}
            />
          </div>
          { this.showRequiredMessage('email') ?
            <p style={{color:'red'}}>Valid email required.</p>
          :
            null
          }
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
          { this.showRequiredMessage('password') ?
            <p style={{color:'red'}}>Password must be at least 8 characters.</p>
          :
            null
          }
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
          { this.showRequiredMessage('confirmPassword') & this.state.confirmPassword !== this.state.password ?
            <p style={{color:'red'}}>Field must match Password.</p>
          :
            null
          }
            <button type="submit" className="btn btn-default">Signup & Login</button>
        </form>
        {
         !this.state.submit ?
          <p style={{color:'red'}}>Please make sure all fields are filled, email is valid & passwords match.</p>
        :
          null
        }
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
