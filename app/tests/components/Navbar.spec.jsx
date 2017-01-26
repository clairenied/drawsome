import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow } from 'enzyme';

import NavbarContainer, { Navbar } from '../../components/Navbar';

chai.use(require('chai-enzyme')());

describe('<Navbar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navbar />);
  });

  it('Should run without errors', () => {
    assert(render(<Navbar />));
  });
});