const express = require('express');
const router = express.Router();
const {
  fund,
  pay,
  balance,
  statement,
} = require('../controllers/transactionController');

router.post('/fund', fund);
router.post('/pay', pay);
router.get('/bal', balance);
router.get('/stmt', statement);

module.exports = router;
