// import React from 'react';
// import chai, { expect, assert } from 'chai';
// import { render, shallow, mount } from 'enzyme';
// import { Signup } from '../../components/Signup.jsx';
// import {login, signup} from 'APP/app/reducers/auth'
//
// const props = {
//   signup,
//   login,
//   warnings:{
//     signinError:'Problem signing in'
//   }
// }
// const newState = {
//   dirtyList: {},
//   firstName: 'Freddy',
//   lastName: 'Mercury',
//   birthday: '1924-02-20',
//   email: 'email@email.com',
//   password: '12345',
//   confirmPassword: '12345',
//   submit:true,
// }
//
// chai.use(require('chai-enzyme')());
//
// describe('<Signup /> Component', () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = shallow(<Signup {...props} />)
//   });
//
// it.only('emailValidate should return true/false for valid/invalid email', () => {
//       expect(wrapper.instance().emailValidate().to.equal(true))
//       wrapper.setState({ email: 'email@emailcom' })
//       expect(wrapper.instance().emailValidate().to.equal(false))
//       wrapper.setState({ email: 'emailemail.com' })
//       expect(wrapper.instance().emailValidate().to.equal(false))
//   })
//
// })
