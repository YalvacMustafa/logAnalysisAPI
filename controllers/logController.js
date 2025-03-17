const Log = require('../models/log');
const customerror = require('../helpers/error/customerror')
const { client } = require('../services/elasticSearchServices');
const { AnalyzesLogWithAI } = require('../services/aiServices');


const createLog = async (req, res) => {
    try {
        const { level, message, metadata } = req.body;
        let insights = null;
        try {
            insights = await AnalyzesLogWithAI(message);
        } catch (error){
            console.error('AI Analizi başarısız.', error.message)
        }
        const newLog = await Log.create({
            message,
            level,
            metadata, 
            insights
        })
        const esResponse = await client.index({
            index: 'logs',
            refresh: 'wait_for',
            body: {
                message,
                level,
                metadata,
                insights,
                timestamps: new Date()
            }
        });
        console.log(esResponse)
        const esId = esResponse.id || null;

        res.status(201).json({
            success: true,
            id: newLog._id,
            esId: esId,
            insights
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