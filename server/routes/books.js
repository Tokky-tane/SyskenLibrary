const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const models = require('../database/models')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

let addObjectName = function (object, name) {
    var emit_object = {}
    emit_object[name] = object
    return emit_object
}

router.get('/', function (req, res, next) {
    models.Book.findAll({ attributes: ['title', 'author', 'isbn'] })
        .then(books => {
            res.json(addObjectName(books, 'books'))
        })
        .catch(err => {
            next(err)
        })
})

router.post('/', [
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
        // 新しく生成された本を指すURLをLocationヘッダに設定する
        let new_book_url = req.protocol + '://' + req.get('host') + req.url + `/${new_book.id}`
        res.location(new_book_url).status(201).end()
        
    }).catch(err => {
        next(err)
    })
})

module.exports = router