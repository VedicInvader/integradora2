const express = require('express');
const ctrl = require('../controllers/readingController');
const auth = require('../middlewares/apiKeyAuth');
const router = express.Router();

router.post('/', auth, ctrl.postReading);
router.get('/', ctrl.getReadings);
router.get('/latest', ctrl.getLatest);

module.exports = router;