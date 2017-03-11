import React from 'react';
import { Table, TableHeader, TableBody, TableHeaderColumn,
TableRow, TableRowColumn} from 'material-ui';

export default ({data}) => (
    <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
            <TableHeaderColumn style={{textAlign: 'left'}}>Code</TableHeaderColumn>
            <TableHeaderColumn>Company</TableHeaderColumn>
            <TableHeaderColumn>Price</TableHeaderColumn>
            <TableHeaderColumn>Value</TableHeaderColumn>
            <TableHeaderColumn>Change</TableHeaderColumn>
            <TableHeaderColumn>%Change</TableHeaderColumn>
        </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {
            data.map((company, index) => {
            return (
                <TableRow key={index}>
                <TableRowColumn style={{color: 'blue'}}>
                    {company.code}
                </TableRowColumn>
                <TableRowColumn style={{color: 'grey', whiteSpace: 'inherit'}}>
                    {company.name}
                </TableRowColumn>
                <TableRowColumn>
                    {company.price}
                </TableRowColumn>
                <TableRowColumn>
                    {company.value}
                </TableRowColumn>
                <TableRowColumn style={{color: (company.change < 0) ? 'red' : 'green' }}>
                    {company.change}
                </TableRowColumn>
                <TableRowColumn style={{color: (company.percent < 0) ? 'red' : 'green' }}>
                    {company.percent}%
                </TableRowColumn>
                </TableRow>
            )
            })
        }
        </TableBody>
    </Table>
)