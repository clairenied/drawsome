import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow } from 'enzyme';
import ComposeMasterpieceContainer from '../../containers/ComposeMasterpieceContainer';

chai.use(require('chai-enzyme')());

describe('<ComposeMasterpieceContainer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ComposeMasterpieceContainer />);
  });

  it('Should run without errors', () => {
    assert(render(<ComposeMasterpieceContainer />));
  });
});