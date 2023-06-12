import React from 'react'

import ResponsiveTable from '../ResponsiveTable/ResponsiveTable'

const ReceivingTransactions = ({transactions}) => {
    const receivingTransactions = transactions.filter((transaction) => transaction.amount > 0);
    return (
        <div className='column'>
            <h3 className='table__heading'>Receiving Transactions</h3>
            <ResponsiveTable data={receivingTransactions}/>
        </div>
    )
}

export default ReceivingTransactions