<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) Bootstrap implementing Nestjs based on hexagonal architecture developped using behaviour driven development (BDD)

## Installation

```bash
$ npm install

```
 - ### docker
  https://docs.docker.com/desktop/mac/install/

create a .env file using the .env.example available on this boostrap


## Running the app

```bash
# docker
$ docker-compose up --build

```

## Test

```bash
# unit tests
$ npm run test

# atdd with cucumber
$ npm run test:bdd:api
AND
$ npm run test:bdd:domain

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](LICENSE).