const swaggerJSDoc = require("swagger-jsdoc");


const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "News API",
        version: "1.0.0",
        description: "API docs for the News API",
    },
    servers: [
        {
            url: "http://localhost:3000",
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);


module.exports = swaggerSpec