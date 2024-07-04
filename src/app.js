const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const newsRoutes = require('./routes/news');
const config = require('./config');
const swagger = require("./swagger");
const {koaSwagger} = require("koa2-swagger-ui");


const app = new Koa();

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        console.error(`Error caught in middleware: `, error)

        ctx.status = error.status || 500;
        ctx.body = {
            message: error.message || "Internal Server Error"
        }

        app.emit("error", error, ctx);
    }

})

app.use(koaSwagger({routePrefix: "/docs", swaggerOptions: {spec: swagger}}))

app.use(bodyParser());
app.use(newsRoutes.routes());
app.use(newsRoutes.allowedMethods());

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

app.on("error", (error) => {
    console.error("Error logging: ", error);
})
