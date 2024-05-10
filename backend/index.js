
import express from 'express'
import morgan from 'morgan'
import ExpressHandlebars from 'express-handlebars'
import { sql, connect } from 'connect'
const app = express()
const port = 3000
app.engine('handlebars', ExpressHandlebars())
app.set('view engine', 'handlebars')
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})