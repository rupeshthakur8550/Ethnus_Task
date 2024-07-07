# Ethnus_Task

This Task is a MERN (MongoDB, Express, React, Node.js) stack application. It provides functionalities to manage transactions with features such as searching, pagination, statistics, and visualizations.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Features](#features)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/rupeshthakur8550/Ethnus_Task.git
    cd Ethnus_Task
    ```

2. **Install backend dependencies**

    ```bash
    cd Backend
    npm install
    ```

3. **Install frontend dependencies**

    ```bash
    cd ../Frontend
    npm install
    ```

## Running the Application

### Backend

1. **Create a `.env` file in the `Backend` directory and add the following environment variables:**

    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=4000
    ```

2. **Start the backend server**

    ```bash
    cd Backend
    npm run dev
    ```

### Frontend

1. **Start the frontend server**

    ```bash
    cd ../Frontend
    npm run dev
    ```

2. **Open your browser and navigate to**

    ```
    http://localhost:5173
    ```

## API Endpoints

The backend server provides the following API endpoints:

- **GET /api/transactions/**: Fetch transactions with search, pagination, and filter by month.
- **GET /api/statistics/**: Get statistics of transactions such as total sales, sold items, and not sold items.
- **GET /api/barchart/**: Get data for the bar chart based on price ranges.
- **GET /api/piechart/**: Get data for the pie chart based on categories.

## Environment Variables

Create a `.env` file in the `Backend` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
PORT=your_preferred_port_number
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_preferred_port_number` with the port number you want the server to run on.

## Features

- **Transaction Management**: Add, update, delete, and search transactions.
- **Pagination**: Navigate through transactions with pagination.
- **Statistics**: View total sales, sold items, and not sold items.
- **Charts**: Visualize transactions with bar and pie charts.

## Acknowledgements

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)

---

Feel free to reach out if you have any questions or need further assistance with the setup. Happy coding!
