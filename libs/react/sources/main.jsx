import React       from "react";
import ReactDOM    from "react-dom";
import AppBar      from "material-ui/lib/app-bar";
import FileManager from "./components/FileManager.jsx";

const header = <AppBar title="file-manager" showMenuIconButton={false} />;
const main   = <FileManager path="/var/www" />;

ReactDOM.render( header, window.document.querySelector( "header" ));
ReactDOM.render( main, window.document.querySelector( "main" ));
