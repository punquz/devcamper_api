const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ success: true, msg: 'show all bootcamps!' });
});

router.get('/:id', (req, res, next) => {
  res.status(200).json({ success: true, msg: `Get bootcamp ${req.params.id}` });
});

router.post('/', (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new bootcamp!' });
});

router.put('/:id', (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
});

router.delete('/:id', (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
});

//export the router
module.exports = router;
