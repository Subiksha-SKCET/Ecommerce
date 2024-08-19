import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ orders }) => {
    const colorSet = [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#FF8C00',
        '#FF1493',
        '#00FF7F',
        '#8A2BE2'
    ];

    const data = {
        labels: orders.map(order => `Order ${order.id}`),
        datasets: [
            {
                data: orders.map(() => 1), 
                backgroundColor: orders.map((_, index) => colorSet[index % colorSet.length]), 
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };

    return (
        <div className="pie-chart-container">
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
