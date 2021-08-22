const express = require('express');

const { login, fetchUser, switchUser } = require('../controllers/user');
const middleware = require('../middlewares/jwt-verify')

const router = express.Router();

router.post('/login', login);
router.post('/user/switch', switchUser);
router.get('/user/details', middleware.verify , fetchUser);

module.exports = router;
