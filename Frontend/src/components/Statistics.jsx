import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = ({ month }) => {
    const [statistics, setStatistics] = useState({ totalSaleAmount: 0, soldItems: 0, notSoldItems: 0 });

    useEffect(() => {
        fetchStatistics(month);
    }, [month]);

    const fetchStatistics = async (month) => {
        try {
            const response = await axios.get(`/api/transactions/statistics`, {
                params: { month: month.toString().padStart(2, '0') }
            });
            setStatistics(response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    return (
        <div className="flex space-x-4">
            <div className="stat-box">
                <p>Total Sales Amount</p>
                <h2>${statistics.totalSaleAmount}</h2>
            </div>
            <div className="stat-box">
                <p>Sold Items</p>
                <h2>{statistics.soldItems}</h2>
            </div>
            <div className="stat-box">
                <p>Not Sold Items</p>
                <h2>{statistics.notSoldItems}</h2>
            </div>
        </div>
    );
};

export default Statistics;
