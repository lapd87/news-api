module.exports = {
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/news',
    port: process.env.PORT || 3000
};
