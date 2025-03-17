const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '../configs/config.env' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const AnalyzesLogWithAI = async (logMessage) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const response = await model.generateContent(logMessage);
        return response.response.text();
    } catch (error){
        console.error('Gemini AI hatası', error);
        return null;
    }
}
module.exports = { AnalyzesLogWithAI };