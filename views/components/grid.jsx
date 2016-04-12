import React from "react";
import {merge, prefix, remove} from "./utils.jsx"

export class Row extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return(
            <div className={merge('row', this.props.className).join( ' ' )} {...remove(this.props, ['className'])} >
                {this.props.children}
            </div>
        );
    }
}

export class Col extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return(
            <div className={merge('col', this.props.col, prefix( 'offset-', this.props.offset ), this.props.className).join( ' ' )} {...remove(this.props, ['className', 'col', 'offset'])} >
                {this.props.children}
            </div>
        );
    }
}
