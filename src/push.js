function push(sessionId, path) {
    // Clear the redo stack!
    console.log('session id => ', sessionId)
    console.log('path => ', path)
    // Create a table in the db for each shell instance, so
    // that we can simply drop the table if a shell instance is
    // killed.
}

export { push }
