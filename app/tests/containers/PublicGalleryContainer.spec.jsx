import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow } from 'enzyme';
import PublicGalleryContainer from '../../containers/PublicGalleryContainer';

chai.use(require('chai-enzyme')());

describe('<PublicGalleryContainer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PublicGalleryContainer />);
  });

  it('Should run without errors', () => {
    assert(render(<PublicGalleryContainer />));
  });
});