import React from "react";

export default class Grid extends React.Component {
    constructor( props ) {
        super( props );

        this.style = {
            display: "flex",
        };
    }

    render() {
        return <div style={this.style} >{this.props.children}</div>;
    }
}
