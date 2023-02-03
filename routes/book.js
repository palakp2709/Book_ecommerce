const express = require('express')
const routes = express.Router()
const {createBooks, getAllBooks , getBooksById, updateBook, deleteBook} = require('../controller/book')
const {verifyToken , isAdmin} = require('../middleware/AuthJwt')


routes.post('/book/api',[verifyToken, isAdmin], createBooks)
routes.get('/book/api', getAllBooks)
routes.get('/book/api/:id', getBooksById)
routes.put('/book/api/:id',[verifyToken , isAdmin], updateBook)
routes.delete('/book/api/:id',[verifyToken ,isAdmin] , deleteBook)

module.exports = { booksRoutes : routes }
