const express = require('express')
const app = express()
const port = 3001

const books = require('./routes/books')

app.use('/books', books)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

app.listen(port, () => console.log(`Sysken Library App listening on port ${port}!`))