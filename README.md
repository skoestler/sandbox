# Sandbox

### Setup

Initialize the PostgreSQL database

```shell
initdb -D ./data/postgres -U postgres
```

### Run

Use process compose to start the database and message broker

```shell
process-compose up .
```

Connect to database

```shell
psql -U postgres
```

Start the app

```shell
npm run server
```

Call endpoint

```shell
http POST localhost:3000/greet name=Shayne
```