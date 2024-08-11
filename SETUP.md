# Setup

# SQLite

To experiment with SQLite,

```bash
docker run -it --rm -v "$(pwd)":/data keinos/sqlite3 sqlite3 /data/test-database.db
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

# DB design

```sql
CREATE TABLE undo_stack (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL
);
```

```sql
CREATE TABLE redo_stack (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL
);
```

## Push operation

```sql
INSERT INTO undo_stack (path) VALUES ('directory path');
```

## Pop operation

```sql
BEGIN TRANSACTION;

-- Retrieve the item with the highest id
WITH item_to_pop AS (
    SELECT id, value
    FROM stack
    ORDER BY id DESC
    LIMIT 1
)
-- Select the value of the item to pop (before deleting it)
SELECT value FROM item_to_pop;

-- Delete the item
DELETE FROM stack
WHERE id = (SELECT id FROM item_to_pop);

COMMIT;
```
