const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'VaultShield',
            version: '1.0.0',
            description: '',
        },
        servers: [
            {
                url: 'http://localhost:8080', // Reemplaza con la URL base de tu API
            },
        ],
    },
    apis: ['./routes/*.js'], // Ruta a tus archivos de rutas de Express
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};