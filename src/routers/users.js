const {Router } = require('express')
const router = Router()
const userController = require('../app/controllers/UserController')
const upload = require('../../src/app/middlewares/multer')


router.get('/join', userController.joinGet);
router.post('/join', userController.joinPost);
router.get('/login', userController.loginGet);
router.post('/login', userController.loginPost);
router.get('/user-list', userController.userList);
router.get('/:id/user-detail', userController.userDetail);
router.get('/:id/update-user', userController.updateUserGet);
router.patch('/:id/update-user',upload.single('avatar'), userController.updateUserPatch);
router.delete('/:id/delete-user', userController.deleteUser);
router.get('/', userController.index)

module.exports = router