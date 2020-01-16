const router = require('express').Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp
} = require('../controllers/bootcampController');

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

//export the router
module.exports = router;
