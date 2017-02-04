import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow, mount } from 'enzyme';
import sinon from 'sinon';
import {EditMasterpieceDraft} from '../../containers/EditMasterpieceDraft';
import DraftContainer from '../../containers/DraftContainer';
import ActivePaperCanvas from '../../components/ActivePaperCanvas'

chai.use(require('chai-enzyme')());


import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

const initProps = {
	user: {
		firstName: "test",
		lastName: "name"
	},
	drawings: {
		1: {
			name: "drawing name",
			versions: []
		}
	},
	versions: {
		1: {
			number: 1
		}
	},
	drafts: {
		1: {
			versions: []
		}
	},
	selectedMasterpiece: {versions: []}
}

const newProps = {
	user: {
		firstName: "test",
		lastName: "name"
	},
	drawings: {
		1: {
			name: "drawing name",
			versions: []
		}
	},
	versions: {
		1: {
			number: 1,
			data: 'foo'
		},
		5: {
			number: 3,
			data: 'bar'
		}
	},
	drafts: {
		1: {
			versions: []
		}
	},
	selectedMasterpiece: {name: 'pretty masterpiece',versions: [1,2,5]}
}


describe('<EditMasterpieceDraft />', () => {
  let wrapper;
  let props;

  beforeEach(() => {
  	props = Object.assign({}, initProps);
    wrapper = shallow(<EditMasterpieceDraft {...props}/>);
  });

  it('should render a <DraftContainer/> component', ()=> {
  	expect(wrapper.find(DraftContainer)).to.have.length(1)
  })

  it('should not render <ActivePaperCanvas/> component when selectedVersion.data is not defined', ()=> {
  	expect(wrapper.find(ActivePaperCanvas)).to.have.length(0)
  })

  it('should render a <ActivePaperCanvas/> component', ()=> {
  	wrapper = shallow(<EditMasterpieceDraft {...newProps}/>);
  	expect(wrapper.find(ActivePaperCanvas)).to.have.length(1)
  })

  it('should show the masterpiece title', () => {
  	wrapper = shallow(<EditMasterpieceDraft {...newProps}/>)
  	expect(wrapper.contains(<h1 className="masterpiece-title">pretty masterpiece</h1>)).to.equal(true);
  	expect(wrapper.contains(<h1 className="masterpiece-title">Pretty Masterpiece</h1>)).to.equal(false);
  })

  it('changes the strokeWidth state when the bigger brush size or smaller brush size buttons are pressed', () => {
  	wrapper = shallow(<EditMasterpieceDraft {...newProps}/>)
  	expect(wrapper.find('a').at(0).text()).to.equal('+')
  	expect(wrapper.state().paperSettings.strokeWidth).to.equal(10)
  	expect(wrapper.find('a').at(0).simulate('click'))
  	expect(wrapper.state().paperSettings.strokeWidth).to.equal(15)

  	expect(wrapper.find('a').at(1).text()).to.equal('-')
  	expect(wrapper.state().paperSettings.strokeWidth).to.equal(15)
  	expect(wrapper.find('a').at(1).simulate('click'))
  	expect(wrapper.state().paperSettings.strokeWidth).to.equal(10)

  	expect(wrapper.find('a').at(1).simulate('click'))
  	expect(wrapper.state().paperSettings.strokeWidth).to.equal(5)
  })

  it('changes the opacity state when the moreOpaque or lessOpaque buttons are pressed', () => {
  	wrapper = shallow(<EditMasterpieceDraft {...newProps}/>)
  	expect(wrapper.find('a').at(2).text()).to.equal('+')
  	expect(wrapper.state().paperSettings.opacity).to.equal(1)
  	expect(wrapper.find('a').at(2).simulate('click'))
  	expect(wrapper.state().paperSettings.opacity).to.equal(1)

		expect(wrapper.find('a').at(3).text()).to.equal('-')
  	expect(wrapper.find('a').at(3).simulate('click'))
  	expect(wrapper.state().paperSettings.opacity).to.equal(0.9)  	
  })

  it('changes the strokeColor state when one of the colors are clicked', () => {
  	expect(wrapper.find('a').at(4).contains(<div className="red"></div>)).to.equal(true)
  	expect(wrapper.state().paperSettings.strokeColor).to.equal('black')
  	expect(wrapper.find('a').at(4).simulate('click'))
  	expect(wrapper.state().paperSettings.strokeColor).to.equal('red')
  })

	it('has an undo button', () => {
		expect(wrapper.find('button').at(1).text()).to.equal('Undo')
	})  

	it('has a clear button', () => {
		expect(wrapper.find('button').at(0).text()).to.equal('Clear')
	}) 

	it('has a save button that saves the masterpiece and goes to the same route', () => {
		expect(wrapper.find('button').at(2).text()).to.equal('Save')
	}) 

	it('has a post button that posts the masterpiece', () => {
		expect(wrapper.find('button').at(3).text()).to.equal('Post')
	}) 


  // it.only('Should run without errors', () => {
  //   assert(render(<EditMasterpieceDraft {...newProps}/>));
  // });
});
