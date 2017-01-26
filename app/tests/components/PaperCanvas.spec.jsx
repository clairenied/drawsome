import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow } from 'enzyme';

import PaperCanvas from '../../components/PaperCanvas';

chai.use(require('chai-enzyme')());

describe('<PaperCanvas />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PaperCanvas />);
  });

  it('Should run without errors', () => {
    assert(render(<PaperCanvas />));
  });
});