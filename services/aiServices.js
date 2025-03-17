const OpenAI = require('openai');
require('dotenv').config({ path: '../configs/config.env'});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const AnalyzesLogWithAI = async (logMessage) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            message: [{ role: 'system', content: `Analyze the following log and provide insights:\n\n${logMessage}` }],
        });
        return response.choices[0].message.content;
    } catch (error){
        console.error('OpenAI API Error', error);
        return "Analysis Failed";
    }
};
module.exports = { AnalyzesLogWithAI };