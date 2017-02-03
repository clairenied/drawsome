import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow, mount } from 'enzyme';
import BigDoodle from '../../components/BigDoodle.jsx';
import PaperCanvas from '../../components/PaperCanvas'

chai.use(require('chai-enzyme')());

const initProps = {
	masterpiece: {
		name: "masterpieceName",
    versions: [{versionData:'blah'}],
    comments:[]
	},
	profile: {
			profile: "profile",
      id: 1,
      firstName: "Whomever",
      lastName: "Whatever"
		}
	}

const newProps = {
  masterpiece: {
		name: "masterpieceName",
    versions: [{versionData:'blah'}],
    comments:[ { versions:[{versionData:'qrwtyrw'}] , id:1, users:[ {id:1, fullName:'Mike' }] } ]
	},
	profile: {
			profile: "profile",
      id: 1,
      firstName: "Whomever",
      lastName: "Whatever"
		}
	}

describe('<BigDoodle />', () => {
  let wrapper;
  let props;

  beforeEach(() => {
  	props = Object.assign({}, initProps);
    wrapper = shallow(<BigDoodle {...props}/>);
  });

  it('should render a <PaperCanvas/> component', ()=> {
  	expect(wrapper.find(PaperCanvas)).to.have.length(1)
  })

  it('should render <PaperCanvas/> for each comment', ()=> {
    wrapper = shallow(<BigDoodle {...newProps}/>);
  	expect(wrapper.find(PaperCanvas)).to.have.length(2)
  })

});
