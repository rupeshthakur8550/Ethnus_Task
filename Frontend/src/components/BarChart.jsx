import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ month, data }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        if (month) {
            setChartData(formatChartData(data));
        }
    }, [month, data]);

    const formatChartData = (data) => {
        if (Array.isArray(data) && data.length > 0) {
            const labels = data.map(item => item.range);
            const values = data.map(item => item.count);

            return {
                labels,
                datasets: [
                    {
                        label: 'Number of Items',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }
                ]
            };
        } else {
            console.error('Unexpected data format', data);
            return { labels: [], datasets: [] };
        }
    };

    return (
        <div className="mt-8">
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Transactions by Price Range',
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Price Range'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Number of Items'
                            },
                            beginAtZero: true,
                        }
                    }
                }}
            />
        </div>
    );
};

export default BarChart;
