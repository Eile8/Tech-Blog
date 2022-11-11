const express = require('express');
const router = express.Router();


const apiController = require('./api');
router.use('/api', apiController);

const frontEnd = require('./frontEnd');
router.use(frontEnd);

module.exports = router;