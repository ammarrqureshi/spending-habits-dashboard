import React, { useState, useContext, useEffect } from 'react';
import TransactionRow from './TransactionRow';
import { AuthContext } from '../context/AuthProvider';

function Transaction() {
  const { data } = useContext(AuthContext);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Ensure data is available
  if (!data || !data.scores || data.scores.length === 0) {
    return <div>Loading...</div>;
  }

  // Get the latest object from data.scores (first element)
  const latestData = data.scores[0];
  const transactions = latestData.statement_data || [];

  // Extract unique months from the transaction data
  useEffect(() => {
    const monthsSet = new Set();
    transactions.forEach(transaction => {
      const month = transaction[2]; // assuming month is the third element in the array
      monthsSet.add(month);
    });

    const monthsArray = Array.from(monthsSet);
    setAvailableMonths(monthsArray);

    // Set the latest month as the default selected
    if (monthsArray.length > 0) {
      setSelectedMonth(monthsArray[monthsArray.length - 1]);
    }
  }, [transactions]);

  // Filter transactions based on the selected month
  useEffect(() => {
    if (selectedMonth) {
      const filteredData = transactions.filter(transaction => {
        const month = transaction[2]; // assuming month is the third element in the array
        return month === selectedMonth;
      });
      setFilteredTransactions(filteredData);
    }
  }, [selectedMonth, transactions]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="bg-white rounded-lg p-3 w-full">
      <div className="flex flex-row items-center justify-between pb-8">
        <h1 className="font-bold text-gray-800 text-xl">Summary of Transaction</h1>
        <select
          className="p-1 border border-gray-300 rounded-lg text-xs shadow-sm outline-none"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {availableMonths.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      {/* Table Container */}
      <div className="overflow-y-auto scrollbar-thin max-h-[50vh]">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="py-2 pr-4 text-gray-400 text-xs font-light text-left text-nowrap w-[40%]">
                Name
              </th>
              <th className="py-2 px-4 text-gray-400 text-xs font-light text-left text-nowrap w-[20%]">
                Date
              </th>
              <th className="py-2 px-4 text-gray-400 text-xs font-light text-left text-nowrap w-[20%]">
                Amount
              </th>
              <th className="py-2 px-4 text-gray-400 text-xs font-light text-left text-nowrap w-[20%]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((row, index) => (
              <TransactionRow
                key={index}
                name={row[0]} // Assuming the name is the first element in the array
                date={row[1]} // Combining day and month for the date
                amount={row[3]} // Assuming the amount is the fourth element in the array
                status={row[4]} // Assuming the status is the fifth element in the array
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transaction;
