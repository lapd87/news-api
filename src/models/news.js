const {MongoClient, ObjectId} = require('mongodb');
const config = require('../config');

let db;

async function connectDB() {
    if (!db) {
        const client = new MongoClient(config.mongoUri);
        await client.connect();
        db = client.db();
    }
    return db;
}

async function getNewsCollection() {
    const db = await connectDB();

    return db.collection('news');
}

async function getAllNews(filter = {}, sort = {}) {
    const collection = await getNewsCollection();

    return collection.find(filter).sort(sort).toArray();
}

async function getNewsById(id) {
    const collection = await getNewsCollection();

    return collection.findOne({_id: new ObjectId(id)});
}

async function createNews(news) {
    const collection = await getNewsCollection();
    const result = await collection.insertOne(news);

    return result.insertedId;
}

async function updateNews(id, news) {
    const collection = await getNewsCollection();
    await collection.updateOne({_id: new ObjectId(id)}, {$set: news});

    return getNewsById(id);
}

async function deleteNews(id) {
    const collection = await getNewsCollection();

    return collection.deleteOne({_id: new ObjectId(id)});
}

module.exports = {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews
};
