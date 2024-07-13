import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AuthContext } from '../context/AuthProvider';

function PieChart() {
    const { data } = useContext(AuthContext);

    // Ensure data is available
    if (!data || !data.scores || data.scores.length === 0) {
        return <div>Loading...</div>;
    }

    // Get the latest object from data.scores (first element)
    const latestData = data.scores[0];
    const debitChart = latestData.debit_chart || [];

    // Combine duplicate labels and sum their values
    const combinedData = debitChart.reduce((acc, [label, value]) => {
        if (acc[label]) {
            acc[label] += value;
        } else {
            acc[label] = value;
        }
        return acc;
    }, {});

    // Convert combined data back to array format and sort by value
    const sortedData = Object.entries(combinedData).sort((a, b) => b[1] - a[1]);

    // Extract values and labels from sorted data
    const dataValues = sortedData.map(item => item[1]);
    const dataLabels = sortedData.map(item => item[0]);

    const total = dataValues.reduce((acc, val) => acc + val, 0);

    // Get the top 5 items and the rest as "Other"
    const top5Data = sortedData.slice(0, 5);
    const otherData = sortedData.slice(5);

    const top5Values = top5Data.map(item => item[1]);
    const top5Labels = top5Data.map(item => item[0]);
    const otherTotal = otherData.reduce((acc, item) => acc + item[1], 0);

    // Add "Other" category
    if (otherTotal > 0) {
        top5Values.push(otherTotal);
        top5Labels.push('Other');
    }

    const top5Percentages = top5Values.map(value => ((value / total) * 100).toFixed(1) + '%');

    const dataChart = {
        labels: top5Labels,
        datasets: [
            {
                data: top5Values,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF9F40',
                    '#4BC0C0',
                    '#9966FF',
                    '#F7464A',
                    '#46BFBD',
                    '#FDB45C',
                    '#949FB1',
                    '#4D5360',
                    '#AC64AD',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF9F40',
                    '#4BC0C0',
                    '#9966FF',
                    '#F7464A',
                    '#46BFBD',
                    '#FDB45C',
                    '#949FB1',
                    '#4D5360',
                    '#AC64AD',
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Disable the built-in legend
            },
            datalabels: {
                display: false, // Disable datalabels on the chart
            },
        },
    };

    return (
        <div className="bg-white rounded-md p-4 flex flex-col items-start gap-6 w-full">
            <h1 className="font-bold text-gray-800 text-xl">Expenditures</h1>
            <div className="w-full">
                <Pie data={dataChart} options={options} plugins={[ChartDataLabels]} />
            </div>
            <div className="flex flex-col items-start gap-1 mt-4">
                {top5Labels?.map((label, index) => (
                    <div key={index} className="flex flex-row items-center">
                        <div
                            style={{ backgroundColor: dataChart.datasets[0].backgroundColor[index] }}
                            className="w-3 h-3 rounded-sm mr-2"
                        ></div>
                        <span className="text-gray-800 text-sm mr-2">{label}</span>
                        <span className="text-gray-600 text-md font-bold">{top5Percentages[index]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PieChart;
