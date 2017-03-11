import React from 'react';
import { Tabs, Tab } from 'material-ui';
export default ({gainerHandler, loserHandler}) => {
  return (
    <Tabs>
      <Tab label="TOP GAINERS" style={{ padding: '5px 38px' }} onClick={() => gainerHandler()}>
      </Tab>
      <Tab label="TOP LOSER" style={{ padding: '4px 38px', }} onClick={() => loserHandler()}>
      </Tab>
    </Tabs>
  )
}