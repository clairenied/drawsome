import React from 'react'
import {Alert} from 'react-bootstrap';
import { browserHistory } from 'react-router'

export class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user && this.props.user === null){
      browserHistory.push('/gallery')
    }
  }

  loginUser(e){
    e.preventDefault();
    this.props.login(this.state.email, this.state.password)
  }

  updateInput(field, e){
    this.setState({
      [field]: e.target.value
    })
  }

  render(){
    return (
      <div className="container">
        <div className="login-container">
          <div className="login-form-container">
            <div className="page-header">
              <span className="login-logo-pink"><b>Draw</b></span><span className="login-logo-orange"><b>some</b></span>
              <div className="login-subheader">
                <h3>Welcome to Drawsome, the app where you talk to your friends through doodles!</h3>
              </div>
            </div>
            <form className="login-form" onSubmit={this.loginUser.bind(this)}>
              <div>
              { this.props.warnings.loginError ?
                (<Alert bsStyle="warning">
                  <strong>Oh no!</strong> Looks like your email or password is incorrect. Try again!
                </Alert>) : null
              }
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input className="form-control"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.updateInput.bind(this, 'email')}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input className="form-control"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.updateInput.bind(this, 'password')}
                />
              </div>
              <button type="submit" className="btn btn-secondary" id="login-button">Login</button>
              <div className="or buffer">
                <div className="back-line">
                  <span>OR</span>
                </div>
              </div>
              <div className="buffer-oauth">
                <p>
                  <a target="_self"
                     href="/api/auth/google"
                     className="btn btn-social btn-google">
                  <span className="fa fa-google"></span>
                  <span>Login with Google</span>
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'


function mapStateToProps(state){
  return {
    user: state.auth,
    warnings: state.warnings
  }
}

export default connect (mapStateToProps,
  {login},
) (Login)
