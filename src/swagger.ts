import swaggerJsDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: '3.0.0',
    info:{
        title:"class app",
        version:"1.0.0",
        description:'show all the api request from the class'
    },
    servers:[
        {
            url:'http://localhost:3000'
        }
    ],
}

const options = {
    swaggerDefinition,
    apis:['./src/routes/*.ts','./src/app.ts']
}

export const swaggerSpec = swaggerJsDoc(options)