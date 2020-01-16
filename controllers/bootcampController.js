/* 
    @desc Get All Bootcamps
    @route GET /api/v1/bootcamps
    @access public
**/
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'show all bootcamps!' });
};

/* 
    @desc Get Single Bootcamp
    @route GET /api/v1/bootcamps/:id
    @access public
**/
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Get bootcamp ${req.params.id}` });
};

/* 
    @desc Create New Bootcamp
    @route POST /api/v1/bootcamps
    @access private
**/
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new bootcamp!' });
};

/* 
    @desc Update Bootcamp
    @route PUT /api/v1/bootcamps/:id
    @access private
**/
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

/* 
    @desc Delete Bootcamp
    @route DELTE /api/v1/bootcamps/:id
    @access private
**/
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};
