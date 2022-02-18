const fs = require('fs')
const path = require('path')
const mockBaseURL = 'http://localhost:3000'
const realBaseURL = 'http://note-serve.hunger-vally.com'

export.
config = function ({ isDev = true } = { isDev: true } {
  let fileTxt = `module.exports = {
  baseURL:'${ISDev ? mockBaseURL : realBaseURL}'
    '}`

}
)
