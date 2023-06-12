/*import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import App from './App';

jest.mock('axios');
jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

describe('App', () => {
  it('renders LoginForm when not logged in', () => {
    render(<App />);

    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
  });

  it('logs in as admin and adds a new transaction', async () => {
    render(<App />);
    
    // Mock the response from the server for authentication
    axios.post.mockResolvedValueOnce({ data: {} });

    const userIdInput = screen.getByLabelText('User ID');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(userIdInput, { target: { value: 'admin' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.queryByTestId('login-form')).not.toBeInTheDocument();
    });

    // Mock the response from the server for adding a transaction
    axios.post.mockResolvedValueOnce({ data: {} });

    const addTransactionButton = screen.getByRole('button', { name: 'Add Transaction' });
    fireEvent.click(addTransactionButton);

    // Add assertions for the modal and input fields, fill in values, and click the "Add" button

    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
      // Add more assertions for the updated transactions list
    });
  });

  it('logs in as non-admin and does not add a new transaction', async () => {
    render(<App />);
    
    // Mock the response from the server for authentication
    axios.post.mockResolvedValueOnce({ data: {} });

    const userIdInput = screen.getByLabelText('User ID');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(userIdInput, { target: { value: 'user' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.queryByTestId('login-form')).not.toBeInTheDocument();
    });

    const addTransactionButton = screen.getByRole('button', { name: 'Add Transaction' });
    fireEvent.click(addTransactionButton);

    // Assertions for the error message displayed when non-admin tries to add a transaction
  });

  it('compresses transactions and saves as CSV file', async () => {
    render(<App />);
    
    // Mock the response from the server for authentication
    axios.post.mockResolvedValueOnce({ data: {} });

    const userIdInput = screen.getByLabelText('User ID');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(userIdInput, { target: { value: 'admin' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.queryByTestId('login-form')).not.toBeInTheDocument();
    });

    // Mock the response from the server for compressing transactions
    axios.post.mockResolvedValueOnce({ data: {} });

    const compressButton = screen.getByRole('button', { name: 'Compress Transactions' });
    fireEvent.click(compressButton);

    await waitFor(() => {
      // Assertions for checking if the CSV file was saved
      expect(saveAs).toHaveBeenCalledTimes(1);
      expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'compressed_transactions.csv');
    });
  });
});

