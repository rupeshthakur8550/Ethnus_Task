// src/components/Dropdown.js
import React from 'react';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const Dropdown = ({ selectedMonth, onChange }) => (
    <select
        className="form-select my-3 block w-full"
        value={selectedMonth}
        onChange={onChange}
    >
        {months.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
        ))}
    </select>
);

export default Dropdown;
