import React from 'react';
import paper from 'paper';

class ProfileCanvas extends React.Component {

    componentDidMount() {
        paper.setup(this.canvas);
        paper.project.importJSON(this.props.json);

    }
    render() {
        return <canvas width={this.props.width || "450"} height={this.props.height || "450"} ref={(elem) => this.canvas = elem}></canvas>
    }
}

// PaperCanvas.propTypes = {
//     json: React.PropTypes.array.isRequired,
// };

export default ProfileCanvas;
