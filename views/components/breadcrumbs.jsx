import React from "react";
import {merge, remove} from "./utils.jsx";

export class Breadcrumbs extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return(
            <nav {...this.props} >
                <div className="nav-wrapper" >
                    <div className="col s12" >
                        {this.props.children}
                    </div>
                </div>
            </nav>
        );
    }
}

export class BreadcrumbsItem extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return(
            <a className={merge('breadcrumb', this.props.className).join( ' ' )} {...remove(this.props, ['className'])}>{this.props.children}</a>
        );
    }
}
