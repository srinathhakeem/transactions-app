import React, { useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { saveAs } from "file-saver";

import Data from "./data.json";
import LoginForm from './components/LoginForm/LoginForm';
//import ResponsiveTable from './components/ResponsiveTable/ResponsiveTable'
import Header from './components/Header/Header';

import './App.css'
import PayingTransactions from './components/PayingTransactions/PayingTransactions';
import ReceivingTransactions from './components/ReceivingTransactions/ReceivingTransactions';

Modal.setAppElement('#root');

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [transactions, setTransactions] = useState(Data);
  const [counterparty, setCounterparty] = useState("");
  const [amount, setAmount] = useState("");
  const [modalOpen, setModalOpen] = useState(false);


  const handleLogin = (userId) => {
    // Perform authentication logic here (e.g., check if user exists)

    // For demonstration purposes, let's assume user "admin" is an admin
    const isAdminUser = userId === 'admin';

    setLoggedIn(true);
    setIsAdmin(isAdminUser);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setIsAdmin(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddTransaction = () => {
    if (isAdmin) {
      let newTransaction = {
        tradingParty: 'me',
        counterparty: counterparty.trim(),
        amount: Number(amount)
      }
      // merge new transaction with copy of old state
      let transactionsData = [...transactions, newTransaction];
      // push new object to state
      setTransactions(transactionsData);
      setCounterparty('');
      setAmount('');
      closeModal()
      // update write to json file
      saveJson(newTransaction);
    } else {
      console.log('You are not authorized to add transactions.');
    }
  };

  const saveJson =  (newTransaction) => {
    // api URL // end point from node server / express server
      const url = 'http://localhost:3001/addTransaction'
      axios.post(url, newTransaction)
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log('error',error);
      });
    }

  const handleCompressTransactions = () => {
    const compressedTransactions = compress(transactions);
    const csvContent = convertToCSV(compressedTransactions);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "compressed_transactions.csv");
  };

  const compress = (transactions) => {
    // object to store the compressed transactions
  const compressedTransactions = {};

  // Iterate through each transaction
  transactions.forEach((transaction) => {
    const { tradingParty, counterparty, amount } = transaction;
    const key = `${tradingParty}-${counterparty}`;

    // Check if the key already exists in the compressed transactions object
    if (key in compressedTransactions) {
      // Add the amount to the existing transaction
      compressedTransactions[key].amount += amount;
    } else {
      // Create a new transaction entry
      compressedTransactions[key] = { tradingParty, counterparty, amount };
    }
  });

  // Convert the compressed transactions object into an array
  return Object.values(compressedTransactions);
  };

  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((transaction) => Object.values(transaction).join(","));
    return `${header}\n${rows.join("\n")}`;
  };
  // const payingTransactions = transactions.filter((transaction) => transaction.amount < 0);
  // const receivingTransactions = transactions.filter((transaction) => transaction.amount > 0);

  return (
    <div className='container'>
      <Header />
      <div className='app'>
        {loggedIn ? (
        <div className='app__content'>
          <div className='greeting'>
            <h2>Welcome, {isAdmin ? 'Admin' : 'User'}</h2>
            <button className='btn-logout' onClick={handleLogout}>Logout</button>
          </div>
          {isAdmin && (
            <button className='button' onClick={openModal}>Add new Transaction</button>
          )}
          <button className='button' onClick={handleCompressTransactions}>Compress Transactions</button>
          <div className='row'>
            <PayingTransactions transactions={transactions}/>
            <ReceivingTransactions transactions={transactions} />
            {/* <div className='column'>
            <h3 className='table__heading'>Paying Transactions</h3>
            <ResponsiveTable data={payingTransactions}/>
            </div> */}
            {/* <div className='column'>
            <h3 className='table__heading'>Receiving Transactions</h3>
            <ResponsiveTable data={receivingTransactions}/>
            </div> */}
          </div>
        </div>
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </div>
      
      <Modal isOpen={modalOpen} onRequestClose={closeModal} >
        <h2>Add new Transaction</h2>
        <div>
          <label>Counterparty: </label>
          <input
            type="text"
            value={counterparty}
            onChange={(e) => setCounterparty(e.target.value)}
          />
        </div>
        <div>
          <label>Amount: </label>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button onClick={handleAddTransaction}>Add Transaction</button>
      </Modal>
    </div>
  );
};

export default App;
