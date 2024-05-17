const dotenv = require('dotenv')
dotenv.config({ path: '.env' })
const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET
module.exports = { PORT, JWT_SECRET }