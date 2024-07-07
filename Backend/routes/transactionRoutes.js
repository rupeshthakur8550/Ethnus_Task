import express from 'express';

import { listTransactions, getCombinedData, getPieChart, getStatistics, getBarChart } from '../controller/transactionController.js'

const router = express.Router();

router.get('/', listTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChart);
router.get('/pie-chart', getPieChart);
router.get('/combined', getCombinedData);

export default router;
