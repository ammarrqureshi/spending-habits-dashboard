import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
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
    const statementData = latestData.statement_data || [];

    // Combine duplicate labels and sum their values
    const combinedData = statementData.reduce((acc, [label, value]) => {
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

    // Get the top 3 items and the rest as "Other"
    const top3Data = sortedData.slice(0, 3);
    const otherData = sortedData.slice(3);

    const top3Values = top3Data.map(item => item[1]);
    const top3Labels = top3Data.map(item => item[0]);
    const otherTotal = otherData.reduce((acc, item) => acc + item[1], 0);

    // Add "Other" category
    if (otherTotal > 0) {
        top3Values.push(otherTotal);
        top3Labels.push('Other');
    }

    const top3Percentages = top3Values.map(value => ((value / total) * 100).toFixed(1) + '%');

    const dataChart = {
        labels: top3Labels,
        datasets: [
            {
                data: top3Values,
                backgroundColor: ['#4F46E5', '#38BDF8', '#202030', '#FF9F40', '#4BC0C0'],
                hoverBackgroundColor: ['#4F46E4', '#38BDF7', '#202033', '#FF9F40', '#4BC0C0'],
                cutout: '65%',
                circumference: 180,
                rotation: 270,
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
        layout: {
            padding: {
                top: 0,
                bottom: 0,
            },
        },
    };

    return (
        <div className="bg-white rounded-md p-4 flex flex-col items-start gap-6 w-full">
            <h1 className="font-bold text-gray-800 text-xl">Activities</h1>
            <div className="w-full">
                <Doughnut data={dataChart} options={options} plugins={[ChartDataLabels]} />
            </div>
            <div className="flex flex-col items-start gap-1 mt-4">
                {top3Labels?.map((label, index) => (
                    <div key={index} className="flex flex-row items-center">
                        <div
                            style={{ backgroundColor: dataChart.datasets[0].backgroundColor[index] }}
                            className="w-3 h-3 rounded-sm mr-2"
                        ></div>
                        <span className="text-gray-800 text-sm mr-2">{label}</span>
                        <span className="text-gray-600 text-md font-bold">{top3Percentages[index]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PieChart;
