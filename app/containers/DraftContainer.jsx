import React, { Component } from 'react';
import {connect} from 'react-redux'
import DoodleDraft from '../components/DoodleDraft'
import { Link } from 'react-router'

class DraftContainer extends Component {
	constructor(props) {
    super(props);
  }

	render(){
		console.log('DRAFTS', this.props.drafts)
		return(
			<div className="container">
	      <h1>Drafts</h1>
				<hr className="divider-rule"/>
				<div className="row">
					{
          this.props.drafts && this.props.drafts.map((draft, i) =>{
            return (
            	<Link key={i} to={`/edit-masterpiece/${draft.id}`}>
              	<DoodleDraft drawing={draft} version={this.props.versions[Math.max(...draft.versions)]} user={this.props.user} />
              </Link>
            )
          })
          }
				</div>
			</div>
		)
	}

}

function mapStateToProps(state, props){
  return {
    user: state.auth,
    drawings: state.drawings,
    drafts: Object.values(state.drawings).filter(drawing => drawing.type === "masterpiece" && drawing.private === true),
    versions: state.versions
  }
}

export default connect(mapStateToProps)(DraftContainer)