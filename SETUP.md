# Setup

# SQLite

To experiment with SQLite,

```bash
docker run -it --rm -v "$(pwd)":/data keinos/sqlite3 sqlite3 /data/test_database.db
```

## Basic commands

### To list all the databases

```sql
.databases
```

### To list all the table

```
.tables
```

### To create a table

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER
);
```
