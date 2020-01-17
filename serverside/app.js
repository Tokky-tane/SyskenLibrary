const express = require('express')
const app = express()
const port = 3001

const { check, validationResult } = require('express-validator')
const models = require('./database/models')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/books', function (req, res, next) {
    models.Book.findAll({ attributes: ['title', 'author', 'isbn'] })
        .then(books => {
            res.json(addObjectName(books, 'books'))
        })
        .catch(err => {
            next(err)
        })
})

app.post('/books', [
    check('title').exists({ checkNull: true }),
    check('isbn').optional().isISBN()
], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    let new_book = req.body

    models.Book.create({
        title: new_book.title,
        author: new_book.author,
        isbn: new_book.isbn
    }).then((new_book) => {
        let new_book_path = req.protocol + '://' + req.get('host') + req.url + `/${new_book.id}`
        res.location(new_book_path).status(201).end()
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