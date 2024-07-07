const Router = require('koa-router');
const newsController = require('../controllers/news');
const {validator, newsSchema, querySchema, paramsSchema} = require('../middlewares/validation');


const router = new Router();

/**
 * @swagger
 * tags:
 *   name: News
 *   description: News management
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Retrieve a list of news articles
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: filterBy
 *         schema:
 *           type: string
 *           enum: [date, title]
 *         description: The field to filter by.
 *       - in: query
 *         name: filterValue
 *         schema:
 *           type: string
 *         description: The value to filter with.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [date, title]
 *         description: The field to sort by.
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: The order to sort.
 *     responses:
 *       200:
 *         description: A list of news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   title:
 *                     type: string
 *                   shortDescription:
 *                     type: string
 *                   text:
 *                     type: string
 */
router.get('/news',validator(querySchema, 'query'), newsController.getAllNews);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Retrieve a single news article by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The news article ID
 *     responses:
 *       200:
 *         description: A single news article
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 title:
 *                   type: string
 *                 shortDescription:
 *                   type: string
 *                 text:
 *                   type: string
 *       404:
 *         description: News article not found
 */
router.get('/news/:id', validator(paramsSchema,'params'),newsController.getNewsById);

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Create a new news article
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created news article
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 title:
 *                   type: string
 *                 shortDescription:
 *                   type: string
 *                 text:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.post('/news', validator(newsSchema, 'body'), newsController.createNews);

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Update a news article
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The news article ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated news article
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 title:
 *                   type: string
 *                 shortDescription:
 *                   type: string
 *                 text:
 *                   type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: News article not found
 */
router.put('/news/:id',validator(newsSchema, 'body'), newsController.updateNews);

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Delete a news article
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The news article ID
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: News article not found
 */
router.delete('/news/:id',validator(paramsSchema,'params'), newsController.deleteNews);


module.exports = router;
