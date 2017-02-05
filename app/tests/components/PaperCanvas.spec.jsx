import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow } from 'enzyme';
import PaperCanvas from '../../components/PaperCanvas';
const canvas = <canvas width="500" height="500" ref={(elem) => this.canvas = elem}></canvas>

chai.use(require('chai-enzyme')());

describe('<PaperCanvas />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PaperCanvas />);
  });

  it('Should run without errors', () => {
    assert(render(<PaperCanvas />));
  });

  it('should render a canvas element', ()=> {
  	expect(wrapper.contains(canvas)).to.equal(true)
  })
});
