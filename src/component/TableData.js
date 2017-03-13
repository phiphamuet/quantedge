import React from 'react';
import { Table, TableHeader, TableBody, TableHeaderColumn,
TableRow, TableRowColumn } from 'material-ui';

const TableData = ({ data }) => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn style={{ textAlign: 'left' }}>Code</TableHeaderColumn>
        <TableHeaderColumn>Company</TableHeaderColumn>
        <TableHeaderColumn>Price</TableHeaderColumn>
        <TableHeaderColumn>Value</TableHeaderColumn>
        <TableHeaderColumn>Change</TableHeaderColumn>
        <TableHeaderColumn>%Change</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {
        data.map(company =>
          <TableRow key={company.id}>
            <TableRowColumn style={{ color: 'blue' }}>
              {company.code}
            </TableRowColumn>
            <TableRowColumn style={{ color: 'grey', whiteSpace: 'inherit' }}>
              {company.name}
            </TableRowColumn>
            <TableRowColumn>
              {company.price}
            </TableRowColumn>
            <TableRowColumn>
              {company.value.toLocaleString()}
            </TableRowColumn>
            <TableRowColumn style={{ color: (company.change < 0) ? 'red' : 'yellowgreen' }}>
              {company.change}
            </TableRowColumn>
            <TableRowColumn style={{ color: (company.percent < 0) ? 'red' : 'yellowgreen' }}>
              {company.percent}%
            </TableRowColumn>
          </TableRow>,
        )
      }
    </TableBody>
  </Table>
);

TableData.propTypes = {
  data: React.PropTypes.arrayOf(
    (propValue, key, componentName, location, propFullName) => {
      if (!(propValue[key].id && propValue[key].code && propValue[key].name &&
        propValue[key].dayPrice && propValue[key].price)) {
        return new Error(`Invalid prop ${propFullName} supplied to ${componentName} validation failed`);
      }
      return true;
    }).isRequired
};

export default TableData;
