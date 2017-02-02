import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow } from 'enzyme';
import {EditMasterpieceDraft} from '../../containers/EditMasterpieceDraft';

chai.use(require('chai-enzyme')());

describe('<EditMasterpieceDraft />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EditMasterpieceDraft />);
  });

  it('Should run without errors', () => {
    assert(render(<EditMasterpieceDraft />));
  });
});
