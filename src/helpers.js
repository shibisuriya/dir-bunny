const getTableName = ({ stackType, sessionId }) => {
    return `${stackType}_stack_${sessionId}`
}

export { getTableName }
