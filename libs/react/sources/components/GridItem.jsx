import React from "react";

export default class GridItem extends React.Component {
    constructor( props ) {
        super( props );

        this.style = {
            flexGrow: this.props.flex,
            flexShrink: 1,
            flexbasis: "auto"
        }
    }

    render() {
        return <div style={this.style}>{this.props.children}</div>;
    }
}
