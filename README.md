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

Start the app

```shell
...
```

Connect to database

```shell
psql -U postgres
```