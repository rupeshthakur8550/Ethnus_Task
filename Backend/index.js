import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactionRoutes.js';
import Transaction from './model/transactions.js';

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO)
    .then(() => console.log('MongoDB is connected'))
    .catch((err) => console.log(err));

const initDatabase = async () => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        await Transaction.deleteMany({});

        // Insert new transactions
        await Transaction.insertMany(transactions);
        console.log('Database initialized with seed data');
    } catch (error) {
        console.error('Error initializing database', error);
    }
};

initDatabase();

app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
