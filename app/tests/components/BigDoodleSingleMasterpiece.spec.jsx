import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow } from 'enzyme';
import BigDoodleSingleMasterpiece from '../../components/BigDoodleSingleMasterpiece';

chai.use(require('chai-enzyme')());

describe('<BigDoodleSingleMasterpiece />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BigDoodleSingleMasterpiece />);
  });

  it('Should run without errors', () => {
    assert(render(<BigDoodleSingleMasterpiece />));
  });
});
