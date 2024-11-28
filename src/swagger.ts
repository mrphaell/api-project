import swaggerAutogen from 'swagger-autogen';

const doc = {
    definitions: {
        User: {
            nome: 'Juca Silva',
            email: 'juca.silva@gmail.com',
            funcao: 'cliente'
        },
        AddUser: {
            $nome: 'Juca Silva',
            $email: 'juca.silva@email.com',
            $senha: '123456',
            $funcao: 'cliente'
        },
        UpdateUser: {
            $nome: 'Juca Silva',
            $email: 'juca.silva@email.com',
            $funcao: 'cliente'
        }
    },
    info: {
        version: 'v1.0.0',
        title: 'Pantore Test API',
        description: 'Pantore Pay Test API',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local server'
        },
    ]
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);