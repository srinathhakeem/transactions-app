import React from 'react'

import ResponsiveTable from '../ResponsiveTable/ResponsiveTable'

const PayingTransactions = ({transactions}) => {
    const payingTransactions = transactions.filter((transaction) => transaction.amount < 0);
    return (
        <div className='column'>
            <h3 className='table__heading'>Paying Transactions</h3>
            <ResponsiveTable data={payingTransactions}/>
        </div>
    )
}

export default PayingTransactions