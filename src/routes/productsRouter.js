const express = require('express');
const productsController = require('../controllers/productsController');
const validateProduct = require('../middlewares/validateProduct');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', validateProduct, productsController.insertProduct);
router.put('/:id', validateProduct, productsController.updateProduct);
router.delete('/:id', productsController.removeProduct);

module.exports = router;
