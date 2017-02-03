import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow, mount } from 'enzyme';
import { Signup } from '../../components/Signup.jsx';
import {login, signup} from 'APP/app/reducers/auth'

const props = {
  signup,
  login,
  warnings:{
    signinError:'Problem signing in'
  }
}
const newState = {
  dirtyList: {},
  firstName: 'Freddy',
  lastName: 'Mercury',
  birthday: '1924-02-20',
  email: 'email@email.com',
  password: '12345',
  confirmPassword: '12345',
  submit:true,
}

chai.use(require('chai-enzyme')());

describe('<Signup /> Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Signup {...props} />)
  });

  it('emailValidate should return true/false for valid/invalid email', () => {
        wrapper.setState({ email: 'email@email.com' })
        expect(wrapper.instance().emailValidate()).to.equal(true)
        wrapper.setState({ email: 'email@emailcom' })
        expect(wrapper.instance().emailValidate()).to.equal(false)
        wrapper.setState({ email: 'emailemail.com' })
        expect(wrapper.instance().emailValidate()).to.equal(false)
    })
  it('fieldsFileld should return true/false if fields filled or not', () => {
        wrapper.setState({ firstName:'Winston',lastName:'Churchill',email: 'email@email.com',password:'theQueen' })
        expect(wrapper.instance().fieldsFilled()).to.equal(true)
        wrapper.setState({ firstName:'',lastName:'Churchill',email: 'email@email.com',password:'theQueen' })
        expect(wrapper.instance().fieldsFilled()).to.equal(false)
        wrapper.setState({ firstName:'Winston',lastName:'',email: 'email@email.com',password:'theQueen' })
        expect(wrapper.instance().fieldsFilled()).to.equal(false)
        wrapper.setState({ firstName:'Winston',lastName:'Churchill',email: '',password:'theQueen' })
        expect(wrapper.instance().fieldsFilled()).to.equal(false)
        wrapper.setState({ firstName:'Winston',lastName:'Churchill',email: 'email@email.com',password:'' })
        expect(wrapper.instance().fieldsFilled()).to.equal(false)
    })
  it('passwordMatch should return true/false if Passwords match/dont', () => {
        wrapper.setState({ password: 'pass', confirmPassword:'pass' })
        expect(wrapper.instance().passwordMatch()).to.equal(true)
        wrapper.setState({ password: 'pass', confirmPassword:'nopass' })
        expect(wrapper.instance().passwordMatch()).to.equal(false)
    })
})
