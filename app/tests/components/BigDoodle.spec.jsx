import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow } from 'enzyme';
import BigDoodle from '../../components/BigDoodle';

chai.use(require('chai-enzyme')());

describe('<BigDoodle />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BigDoodle />);
  });

  it('Should run without errors', () => {
    assert(render(<BigDoodle />));
  });
});
