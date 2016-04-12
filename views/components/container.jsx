import React from "react";
import {merge, remove} from "./utils.jsx";

export class Container extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return(
            <div className={merge('container', this.props.className).join( ' ' )} {...remove(this.props, ['className'])}>
                {this.props.children}
            </div>
        );
    }
}
