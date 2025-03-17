require('dotenv').config({ path: '../configs/config.env'});
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
    cloud: {
        id: process.env.ELASTICSEARCHCLOUDID,
    },
    auth: {
        apiKey: process.env.ELASTICSEARCHAPIKEY,
    },
});

const testConnection = async () => {
    try {
        const health = await client.cluster.health();
        console.log('Elastic Search Bağlantı Başarılı', health);
    } catch (error){
        console.error('Bağlantı Hatası:', error)
    }
};

(async () => {
    await testConnection();
})();
module.exports = { client }