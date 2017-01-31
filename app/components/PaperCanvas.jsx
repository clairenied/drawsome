import React from 'react';
import paper from 'paper';

class PaperCanvas extends React.Component {
    componentDidMount() {
        paper.project && paper.project.importJSON(this.props.json)
    }   
    render() {
        console.log("PAPERCANVAS PROPS", this.props)
        return <canvas ref={(elem) => this.canvas = elem}></canvas>
    }
}

// PaperCanvas.propTypes = {
//     json: React.PropTypes.array.isRequired,
// };

export default PaperCanvas;

