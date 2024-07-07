import React, { useState, useEffect } from 'react';
import { TextInput } from 'flowbite-react';
import axios from 'axios';

const TransactionsTable = ({ month }) => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTransactions();
    }, [month, page, search]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`/api/transactions/`, {
                params: { perPage, page, search }
            });
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions', error);
            setTransactions([]);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleNext = () => {
        setPage(page + 1);
    };

    const handlePrevious = () => {
        setPage(page - 1);
    };

    return (
        <div>
            <TextInput
                type="text"
                placeholder="Search transactions"
                value={search}
                onChange={handleSearchChange}
                id="name"
                className="my-10"
            />
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 mt-4">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sold</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Sale</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Array.isArray(transactions) && transactions.length > 0 ? (
                            transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2">{transaction.title}</td>
                                    <td className="px-4 py-2">{transaction.description}</td>
                                    <td className="px-4 py-2">{transaction.price}</td>
                                    <td className="px-4 py-2">{transaction.category}</td>
                                    <td className="px-4 py-2">
                                        <img src={transaction.image} alt={transaction.title} className="w-12 h-12 object-cover" />
                                    </td>
                                    <td className="px-4 py-2">{transaction.sold ? 'Yes' : 'No'}</td>
                                    <td className="px-4 py-2">{transaction.dateOfSale ? new Date(transaction.dateOfSale).toLocaleDateString() : 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-4 py-2 text-center">No transactions found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between mt-4">
                <button onClick={handlePrevious} disabled={page === 1} className="btn">
                    Previous
                </button>
                <button onClick={handleNext} className="btn">
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionsTable;
