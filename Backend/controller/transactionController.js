import Transaction from '../model/transactions.js';

export const listTransactions = async (req, res) => {
    try {
        const { page = 1, perPage = 10, search = '' } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: parseFloat(search) || 0 },
            ];
        }

        const options = {
            skip: (parseInt(page, 10) - 1) * parseInt(perPage, 10),
            limit: parseInt(perPage, 10),
        };

        const transactions = await Transaction.find(query, null, options);

        res.json(transactions);
    } catch (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getStatistics = async (req, res) => {
    try {
        const { month } = req.query;

        if (!/^\d{2}$/.test(month)) {
            return res.status(400).json({ error: 'Invalid month format. Use MM' });
        }

        const pipeline = [
            {
                $match: {
                    $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month, 10)] },
                },
            },
            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: '$price' },
                    soldItems: { $sum: { $cond: [{ $eq: ['$sold', true] }, 1, 0] } },
                    notSoldItems: { $sum: { $cond: [{ $eq: ['$sold', false] }, 1, 0] } },
                },
            },
        ];

        const statistics = await Transaction.aggregate(pipeline);

        if (!statistics.length) {
            return res.json({ totalSaleAmount: 0, soldItems: 0, notSoldItems: 0 });
        }

        res.json(statistics[0]);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getPieChart = async (req, res) => {
    try {
        const { month } = req.query;

        if (!/^\d{2}$/.test(month)) {
            return res.status(400).json({ error: 'Invalid month format. Use MM' });
        }

        const pipeline = [
            {
                $match: {
                    $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month, 10)] },
                },
            },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    count: 1,
                },
            },
        ];

        const categoryData = await Transaction.aggregate(pipeline);
        const formattedData = categoryData.map(item => ({
            [item.category]: item.count,
        }));

        res.json(formattedData);
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getBarChart = async (req, res) => {
    try {
        const { month } = req.query;

        if (!/^\d{2}$/.test(month)) {
            return res.status(400).json({ error: 'Invalid month format. Use MM' });
        }

        const pipeline = [
            {
                $match: {
                    $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month, 10)] },
                },
            },
            {
                $bucket: {
                    groupBy: '$price',
                    boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
                    default: 'Other',
                    output: {
                        count: { $sum: 1 },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    range: {
                        $switch: {
                            branches: [
                                { case: { $lte: ['$_id', 100] }, then: '0-100' },
                                { case: { $and: [{ $gt: ['$_id', 100] }, { $lte: ['$_id', 200] }] }, then: '101-200' },
                                { case: { $and: [{ $gt: ['$_id', 200] }, { $lte: ['$_id', 300] }] }, then: '201-300' },
                                { case: { $and: [{ $gt: ['$_id', 300] }, { $lte: ['$_id', 400] }] }, then: '301-400' },
                                { case: { $and: [{ $gt: ['$_id', 400] }, { $lte: ['$_id', 500] }] }, then: '401-500' },
                                { case: { $and: [{ $gt: ['$_id', 500] }, { $lte: ['$_id', 600] }] }, then: '501-600' },
                                { case: { $and: [{ $gt: ['$_id', 600] }, { $lte: ['$_id', 700] }] }, then: '601-700' },
                                { case: { $and: [{ $gt: ['$_id', 700] }, { $lte: ['$_id', 800] }] }, then: '701-800' },
                                { case: { $and: [{ $gt: ['$_id', 800] }, { $lte: ['$_id', 900] }] }, then: '801-900' },
                                { case: { $gt: ['$_id', 900] }, then: '901-above' },
                            ],
                            default: 'Other',
                        },
                    },
                    count: 1,
                },
            },
        ];

        const priceRanges = await Transaction.aggregate(pipeline);

        const formattedData = priceRanges
            .filter(item => item.range !== 'Other')
            .map(item => ({
                range: item.range,
                count: item.count,
            }));

        res.json(formattedData);
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getCombinedData = async (req, res) => {
    try {
        const { month } = req.query;

        if (!/^\d{2}$/.test(month)) {
            return res.status(400).json({ error: 'Invalid month format. Use MM' });
        }

        const [statisticsData, barChartData, pieChartData] = await Promise.all([
            getStatistics(req, res),
            getBarChart(req, res),
            getPieChart(req, res),
        ]);

        const combinedData = {
            statistics: statisticsData,
            barChart: barChartData,
            pieChart: pieChartData,
        };

        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching combined data:', error);
        res.status(400).json({ error: 'Error fetching combined data' });
    }
};
