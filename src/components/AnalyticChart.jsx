import React, { useState, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { AuthContext } from '../context/AuthProvider';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AnalyticChart() {
  const { data } = useContext(AuthContext);

  // Ensure data is available
  if (!data || !data.scores || data.scores.length === 0) {
    return <div>Loading...</div>;
  }

  // Get unique years from data
  const years = [...new Set(data.scores.map(item => item.year))];

  const [selectedYear, setSelectedYear] = useState(years[0]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Filter data based on the selected year
  const filteredData = data.scores.filter(item => item.year === selectedYear);

  // Extract months, income, and outcome for the chart
  const months = filteredData.map(item => item.month + " " + item.year);
  const income = filteredData.map(item => item.total_credit);
  const outcome = filteredData.map(item => item.total_debit);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: income,
        backgroundColor: 'rgba(79, 70, 229, 1)', // indigo-600
        borderRadius: 20,
        barThickness: 10,
      },
      {
        label: 'Outcome',
        data: outcome,
        backgroundColor: 'rgba(56, 189, 248, 1)', // sky-400
        borderRadius: 20,
        barThickness: 10,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false, // This will remove the bottom border line
        },
        barPercentage: 0.1,
        categoryPercentage: 0.1, // Adjust this value to control the space between bars within a group
      },
      y: {
        beginAtZero: true,
        grace: '5%',
        grid: {
          display: true,
          drawBorder: false, // This will remove the left border line
        },
        ticks: {
          callback: function (value) {
            return `${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-3 w-full">
      <div className="flex flex-row items-center justify-between pb-12">
        <h1 className="font-bold text-gray-800 text-xl">Analytics</h1>
        <div className='flex flex-row gap-4'>
          <div className="flex gap-4">
            <div className="flex flex-row items-center gap-2">
              <div className="bg-indigo-600 w-2.5 h-2.5 rounded-full"></div>
              <label className='font-semibold text-gray-800 text-xs'>Income</label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="bg-sky-400 w-2.5 h-2.5 rounded-full"></div>
              <label className='font-semibold text-gray-800 text-xs'>Outcome</label>
            </div>
          </div>
          <div className="relative">
            <select 
              className="p-1 border border-gray-300 rounded-lg text-xs shadow-sm outline-none"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
}


export default AnalyticChart;
