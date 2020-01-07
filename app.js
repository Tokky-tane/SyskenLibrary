const express = require('express')
const app = express()
const port = 3001

db = require('./models')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/books', function (req, res, next) {
    db.Book.findAll({ attributes: ['title', 'author', 'isbn'] })
        .then(books => {
            res.json(addObjectName(books, 'books'))
        })
        .catch(err => {
            next(err)
        })
})

app.post('/books', (req, res, next) => {
    let new_book = req.body

    db.Book.create({
        title: new_book.title,
        author: new_book.author,
        isbn: new_book.isbn
    }).then(() => {
        res.send()
    }).catch(err => {
        next(err)
    })
})

function addObjectName(object, name) {
    var emit_object = {}
    emit_object[name] = object
    return emit_object
}

app.listen(port, () => console.log(`Sysken Library App listening on port ${port}!`))