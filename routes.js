const router = require('express').Router();
const users = require('./database/users');

router.post('/adduser', users.AddUser);
router.get('/listusers', users.ListUsers);
router.get('/deleteuser', users.DeleteUser);
router.post('/login', users.LoginUser)


module.exports = router;