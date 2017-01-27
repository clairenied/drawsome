import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow } from 'enzyme';
import MasterpieceContainer from '../../containers/MasterpieceContainer';

chai.use(require('chai-enzyme')());

describe('<MasterpieceContainer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MasterpieceContainer />);
  });

  it('Should run without errors', () => {
    assert(render(<MasterpieceContainer />));
  });
});