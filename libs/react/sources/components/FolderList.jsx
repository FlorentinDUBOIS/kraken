import React from 'react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';
import Card from 'material-ui/lib/card/card';

export default class FolderList extends React.Component {
    constructor( props ) {
        super( props );

        this.items = [
            { primaryText: "ds", secondaryText: "dss" },
            { primaryText: "ds", secondaryText: "dss" },
            { primaryText: "ds", secondaryText: "dss" },
            { primaryText: "ds", secondaryText: "dss" },
            { primaryText: "ds", secondaryText: "dss" },
            { primaryText: "ds", secondaryText: "dss" }
        ];

        this.cardStyle = {
            margin: "1rem",
            marginRight: "0.5rem"
        };
    }

    createListItem( i ) {
        return <ListItem key={parseInt( Math.random() * 100 )} leftAvatar={<Avatar icon={<FileFolder />} />} rightIcon={<ActionInfo />} primaryText={i.primaryText} secondaryText={i.secondaryText} />;
    }

    render() {
        return  <Card style={this.cardStyle} >
            <List subheader="Folders" insetSubheader={true}>{this.items.map(this.createListItem)}</List>
        </Card>;
    }
};
