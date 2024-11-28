# BackEnd API Project

## Definição do Projeto
API com CRUD de Usuários, documentação Swagger e testes automatizados com Jest

## Inicialização
Após clonar o repositório, utilize o comando:
```
npm install
```

Criar arquivo .env com as váriáveis de ambiente descritos no arquivo .env.example

## Scripts úteis configurados

Iniciar o servidor DEV:
```
npm run dev
```

Executar casos de teste:
```
npm run test
```

Exacutar teste de cobertura:
```
npm run test:coverage
```

Ao executar o servidor, para acessar a documentação Swagger, acesse: (assumindo que foi utilizado localhost e porta 4000)
```
http://localhost:4000/api-docs
```

## CI/CD
A aplicação está hospedada no Heroku™, onde alterações na branch são automaticamente testadas, e, passando nos testes, ocorre o deploy.
A aplicação pode ser acessa pelo link abaixo:
```
https://rsa-base-api-f43011b13614.herokuapp.com
```
Sendo assim, a documentação Swagger está hospedada em:
```
https://rsa-base-api-f43011b13614.herokuapp.com/api-docs
```
