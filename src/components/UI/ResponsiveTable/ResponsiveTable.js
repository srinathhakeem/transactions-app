import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableWrapper} from './ResponsiveTable.styles';

const ResponsiveTable = ({ data }) => {
  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Counter Party</TableHeader>
            <TableHeader>Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.counterparty}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default ResponsiveTable;
