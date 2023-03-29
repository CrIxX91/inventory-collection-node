const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldValidator } = require('../middlewares/field-validator');
const { addBrand,getBrands } = require('../controllers/brand');

router.post(
    '/add',
    [
        check('name',`the name it's mandatary`).not().isEmpty(),
        fieldValidator
    ],
    addBrand);

router.get(
    '/list',[],
    getBrands

)

module.exports = router;