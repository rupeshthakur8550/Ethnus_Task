import React, { useState, useEffect } from 'react';
import Dropdown from '../components/Dropdown';
import TransactionsTable from '../components/TransactionsTable';
import Statistics from '../components/Statistics';
import BarChart from '../components/BarChart';
import axios from 'axios';

const TransactionsPage = () => {
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [statistics, setStatistics] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [barChartData, setBarChartData] = useState(null);

    const fetchStatistics = async (month) => {
        try {
            const response = await axios.get(`/api/transactions/statistics`, {
                params: { month: month.toString().padStart(2, '0') }
            });
            setStatistics(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchBarChartData = async (month) => {
        try {
            const response = await axios.get(`/api/transactions/bar-chart`, {
                params: { month: month.toString().padStart(2, '0') }
            });
            setBarChartData(response.data);
        } catch (error) {
            console.error('Error fetching bar chart data:', error);
        }
    };

    useEffect(() => {
        fetchStatistics(selectedMonth);
        fetchBarChartData(selectedMonth);
    }, [selectedMonth]);

    const handleMonthChange = (e) => {
        setSelectedMonth(Number(e.target.value));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>
            <Dropdown selectedMonth={selectedMonth} onChange={handleMonthChange} />
            <Statistics month={selectedMonth} />
            <TransactionsTable transactions={transactions} />
            <BarChart month={selectedMonth} data={barChartData} />
        </div>
    );
};

export default TransactionsPage;