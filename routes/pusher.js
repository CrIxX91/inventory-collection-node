const { Router } = require('express');
const router = Router();
const { authpusher } = require('../controllers/pusher');

router.post(
    '/auth',
    [],
    authpusher);

// router.get('/collection',[],getCollection);

module.exports = router;