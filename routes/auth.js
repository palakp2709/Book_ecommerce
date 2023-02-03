const express = require('express')
const routes = express.Router()
const {signUp , signIn } = require('../controller/auth')
const {checkDuplicateUsernameAndEmail,checkRoles} = 
require('../middleware/user')


routes.post('/book/api/signup',[checkDuplicateUsernameAndEmail],[checkRoles], signUp)
routes.post('/book/api/signin', signIn)


module.exports = { authRoutes : routes}