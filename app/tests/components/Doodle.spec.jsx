import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow } from 'enzyme';
import Doodle from '../../components/Doodle';

chai.use(require('chai-enzyme')());

describe('<Doodle />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Doodle />);
  });

  it('Should run without errors', () => {
    assert(render(<Doodle />));
  });
});
