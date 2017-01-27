import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow } from 'enzyme';
import SingleMasterpieceViewContainer from '../../containers/SingleMasterpieceViewContainer';

chai.use(require('chai-enzyme')());

describe('<SingleMasterpieceViewContainer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SingleMasterpieceViewContainer />);
  });

  it('Should run without errors', () => {
    assert(render(<SingleMasterpieceViewContainer />));
  });
});