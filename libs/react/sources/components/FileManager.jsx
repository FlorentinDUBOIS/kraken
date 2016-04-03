import React from "react";

import Grid       from "./Grid.jsx";
import GridItem   from "./GridItem.jsx";
import FileList   from "./FileList.jsx";
import FolderList from "./FolderList.jsx";

export default class FileManager extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return <Grid>
            <GridItem flex={20} >
                <FolderList />
            </GridItem>

            <GridItem flex={80} >
                <FileList />
            </GridItem>
        </Grid>;
    }
}
