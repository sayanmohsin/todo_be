# Todo Backend

## Docker Commands

for running with docker-compose

```sh
docker-compose up --build -d
```

## API Documentation

(https://documenter.getpostman.com/view/3873826/Tzedi53j)
(http://localhost:3000/)

## Development

To start server in development mode:

```sh
npm run dev
```

## Production

To start server in production mode:

```sh
npm run prod
```

## Testing

To test fuctional requirements with mongodb (default: mongodb)

```sh
npm run test
```

To test fuctional requirements with postgres

```sh
npm run test:pg
```

#### ENVIRONMENTS

To specify the current datasource:
option: 1. pg
option: 2. mongo

```sh
CURRENT_DATASOURCE=mongo
```

Postgres username:

```sh
PGUSER
```

Postgres host:
```sh
PGHOST
```

Postgres password:
```sh
PGPASSWORD
```

Postgres database:
```sh
PGDATABASE
```

Postgres port:
```sh
PGPORT
```

Mongodb connection string:
```sh
MONGO_CONNECTION_STRING
```

