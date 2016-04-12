import React from "react";
import {merge, remove} from "./utils.jsx";

export class Collection extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return(
            <ul className={merge('collection', this.props.className).join( ' ' )} {...remove(this.props, ['className'])} >
                {this.props.children}
            </ul>
        );
    }
}

export class CollectionItem extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return(
            <li className={merge('collection-item', this.props.className).join( ' ' )} {...remove(this.props, ['className'])} >{this.props.children}</li>
        );
    }
}
