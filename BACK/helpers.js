const fs = require('fs/promises')

function generateError (message, status) {
  const error = new Error(message)

  error.httpStatus = status

  return error
}

const createPathIfNotExists = async (path) => {
  try {
    await fs.access(path)
  } catch {
    await fs.mkdir(path)
  }
}

module.exports =
{ generateError, createPathIfNotExists }
