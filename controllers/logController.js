const Log = require('../models/log');
const customerror = require('../helpers/error/customerror')
const { client } = require('../services/elasticSearchServices');
const { AnalyzesLogWithAI } = require('../services/aiServices');


const createLog = async (req, res) => {
    try {
        const { level, message, metadata } = req.body;
        const insights = await AnalyzesLogWithAI(message);

        const newLog = new Log({ message, level, metadata, insights });
        await newLog.save();

        const esResponse = await client.index({
            index: 'logs',
            body: {
                message,
                level,
                metadata,
                insights,
                timestamp: new Date(),
            },
        });
        res.status(201).json({
            success: true,
            id: esResponse.body._id, insights
        });
    } catch (error){
        console.error('Log oluşturma sırasında bir hata meydana geldi.', error)
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
};

module.exports = { createLog };