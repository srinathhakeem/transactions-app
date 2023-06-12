import React from "react";
import ResponsiveTable from "../../UI/ResponsiveTable/ResponsiveTable";

const ReceivingTransactions = ({transactions}) => {
    const receivingTransactions = transactions.filter((transaction) => transaction.amount > 0);
    return(
        <div className='table'>
            <h3 className='table__heading'>Paying Transactions</h3>
            <ResponsiveTable data={receivingTransactions}/>
        </div>
    )
}

export default ReceivingTransactions