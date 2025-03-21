const Log = require('../models/log');
const customerror = require('../helpers/error/customerror')
const { client } = require('../services/elasticSearchServices');
const { AnalyzesLogWithAI } = require('../services/aiServices');


const createLog = async (req, res) => {
    try {
        const id = req.user.id;
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
            insights,
            userId: id
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
        const esId = esResponse._id || null;

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

const getAllLogOfUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const logs = await Log.find({ userId: userId });
        if (!logs){
            return next(new customerror('Kayıt bulunamadı', 404))
        }
        res.status(200).json({
            success: true,
            data: logs
        })
    } catch(error){
        return next(new customerror('İşlem sırasında bir hata meydana geldi.', 500))
    }
}

const getSingleLogOfUser = async (req, res, next) => {
    try {
        const { logId } = req.params;
        const userId = req.user.id;
        const log = await Log.findOne({ _id: logId, userId})
        if (!log){
            return next(new customerror('Kayıt bulunamadı', 404))
        }
        res.status(200).json({
            success: true,
            data: log
        })
    } catch(error){
        return next(new customerror('İşlem sırasında bir hata meydana geldi.', 500))
    }
}

const getUserLogs = async (req, res) => {
    try {
        const { level } = req.params;
        const userId = req.user.id;

        const allowedLevels = ['info', 'warn', 'error'];
        if (level && !allowedLevels.includes(level)){
            return res.status(400).json({
                success: false,
                message: 'Geçersiz input'
            });
        }
        
        const logs = await Log.find({ userId, ...(level && { level }) });
        if (!logs.length){
            return res.status(404).json({
                success: false,
                message: 'Log bulunamadı.'
            })
        }
        res.status(200).json({
            success: true,
            data: logs
        });
    } catch(error){
        res.status(500).json({
            success: false,
            error: error.message,
            stack: error.stack,
        })
    }
}
module.exports = { createLog, getAllLogOfUser, getSingleLogOfUser, getUserLogs };