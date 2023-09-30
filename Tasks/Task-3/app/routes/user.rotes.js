const router = require('express').Router()
const userController = require('../controller/user.controller')

router.get('/', userController.showAll)
router.get('/add', userController.add)
router.post('/add', userController.addLogic)
router.get('/show/:userId', userController.showSingle)
// router.get('/delete', userController.deleteUser)
router.get('/edit/:userId', userController.editUser)
router.post('/edit/:userId', userController.editLogic)
router.get('/delete/:userId', userController.deleteLogic)

module.exports = router