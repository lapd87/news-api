const newsModel = require('../models/news');

async function getAllNews(ctx) {
    const {filterBy, filterValue, sortBy, sortOrder} = ctx.query;
    const filter = {};
    const order = {};

    if (filterBy && filterValue) {
        filter[filterBy] = new RegExp(filterValue, 'i');
    }

    if (sortBy) {
        order[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    ctx.body = await newsModel.getAllNews(filter, order);
}

async function getNewsById(ctx) {
    const {id} = ctx.params;
    const news = await newsModel.getNewsById(id);

    if (!news) {
        ctx.status = 404;
        ctx.body = {error: 'News not found'};
        return;
    }

    ctx.body = news;
}

async function createNews(ctx) {
    const {date, title, shortDescription, text} = ctx.request.body;

    // if (!date || !title || !shortDescription || !text) {
    //     ctx.status = 400;
    //     ctx.body = {error: 'All fields are required'};
    //     return;
    // }

    const news = await newsModel.createNews({date, title, shortDescription, text});

    ctx.status = 201;
    ctx.body = news;
}

async function updateNews(ctx) {
    const {id} = ctx.params;
    const {date, title, shortDescription, text} = ctx.request.body;

    // if (!date || !title || !shortDescription || !text) {
    //     ctx.status = 400;
    //     ctx.body = {error: 'All fields are required'};
    //     return;
    // }

    const news = await newsModel.updateNews(id, {date, title, shortDescription, text});

    if (!news) {
        ctx.status = 404;
        ctx.body = {error: 'News not found'};
        return;
    }

    ctx.body = news;
}

async function deleteNews(ctx) {
    const {id} = ctx.params;
    const result = await newsModel.deleteNews(id);

    if (result.deletedCount === 0) {
        ctx.status = 404;
        ctx.body = {error: 'News not found'};
        return;
    }

    ctx.status = 204;
}


module.exports = {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews
};
