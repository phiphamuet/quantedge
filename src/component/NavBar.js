import React from 'react';
import { AppBar } from 'material-ui';

export default ({ LeftLogo, RightTabs, gainerHandler, loserHandler }) => (
    <AppBar
        style={{position: 'relative', top: '-8px'}}
        title=""
        iconElementLeft={<LeftLogo/>}
        iconElementRight={<RightTabs gainerHandler={gainerHandler} loserHandler={loserHandler}/>}
    />
);