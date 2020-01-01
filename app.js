const express = require('express')
const app = express()
const port = 3000

db = require('./models')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/books', function (req, res, next) {
    db.Book.findAll({ attributes: ['title', 'author', 'isbn'] })
        .then(books => {
            res.send(books)
        })
        .catch(err => {
            next(err)
        })
})

app.listen(port, () => console.log(`Sysken Library App listening on port ${port}!`))