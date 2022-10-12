const Router = require('express').Router

const userController = require('../controllers/UserController')

const router = new Router()

const {body} = require('express-validator')

const authMiddleware = require('../middlewares/AuthMiddleware')

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 24}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

router.get('/activation/:link', userController.activation)
router.get('/refresh', userController.refresh)

/* Тестовый ендпоинт. Будет доступный только для авторизованых пользователей */

router.get('/users', authMiddleware, userController.getUsers)

module.exports = router