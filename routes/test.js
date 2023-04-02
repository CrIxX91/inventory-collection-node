const { Router } = require('express');
const router = Router();
const { testhandler } = require('../controllers/test');

router.get(
    '/',
    [],testhandler
    );

// router.get('/collection',[],getCollection);

module.exports = router;