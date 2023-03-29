const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldValidator } = require('../middlewares/field-validator');
const { addItem,getCollection } = require('../controllers/inventory');

router.post(
    '/add',
    [
        check('name',`the name it's mandatary`).not().isEmpty(),
        check('brand',`the brand it's mandatary`).not().isEmpty(),
        check('price',`the price it's mandatary`).not().isEmpty(),
        check('quantity',`the quantity it's mandatary`).not().isEmpty(),
        fieldValidator
    ],
    addItem);

router.get('/collection',[],getCollection);

module.exports = router;