import React from 'react';
import chai, { expect, assert } from 'chai';
import { render, shallow, mount } from 'enzyme';
import {EditMasterpieceDraft} from '../../containers/EditMasterpieceDraft';
import DraftContainer from '../../containers/DraftContainer';
import ActivePaperCanvas from '../../components/ActivePaperCanvas'

chai.use(require('chai-enzyme')());

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
	selectedMasterpiece: {versions: [1,2,5]}
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


  // it.only('Should run without errors', () => {
  //   assert(render(<EditMasterpieceDraft {...newProps}/>));
  // });
});
