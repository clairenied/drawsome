import React from 'react';
import paper from 'paper';

class PaperCanvas extends React.Component {

    componentDidMount() {
        paper.setup(this.canvas);
        paper.project.importJSON(this.props.json);
        paper.view.scale(0.57,[25,70]);

    }
    render() {
        return <canvas width="300" height="300" ref={(elem) => this.canvas = elem}></canvas>
    }
}

// PaperCanvas.propTypes = {
//     json: React.PropTypes.array.isRequired,
// };

export default PaperCanvas;
