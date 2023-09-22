const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const userRoutes = router.post('/create', userController.createUser);
const selectRoutes = router.get('/all', userController.selectUser);
const deleteRoutes = router.delete('/delete/:id', userController.deleteUser);
const updateUserNameRoutes = router.put('/updateUserName/:id', userController.updateUserName);
const updateEmailRoutes = router.put('/updateEmail/:id', userController.updateEmail);
const updatePasswordRoutes = router.put('/updatePassword/:id', userController.updatePassword);
const loginRoutes = router.post('/login', userController.login);


module.exports = userRoutes;
module.exports = selectRoutes;
module.exports = deleteRoutes;
module.exports = updateUserNameRoutes;
module.exports = updateEmailRoutes;
module.exports = updatePasswordRoutes;
module.exports = loginRoutes;