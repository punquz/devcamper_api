const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../util/geocoder');
const Bootcamp = require('../models/Bootcamp');

/* 
    @desc Get All Bootcamps
    @route GET /api/v1/bootcamps
    @access public
**/
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(gt|lt|gte|lte|in)\b/g, match => `$${match}`);
  console.log(queryStr);
  query = Bootcamp.find(JSON.parse(queryStr));
  const bootcamps = await query;
  if (bootcamps.length === 0)
    return res.status(200).json({ status: true, message: 'No data' });
  res.status(200).json({
    success: true,
    total: bootcamps.length,
    msg: 'show all bootcamps!',
    data: bootcamps
  });
});

/* 
    @desc Get Single Bootcamp
    @route GET /api/v1/bootcamps/:id
    @access public
**/
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp not found with id:${req.params.id}`, 404)
    );
  res.status(200).json({
    success: true,
    msg: `Get bootcamp ${req.params.id}`,
    data: bootcamp
  });
});

/* 
    @desc Create New Bootcamp
    @route POST /api/v1/bootcamps
    @access private
**/
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res
    .status(201)
    .json({ success: true, data: bootcamp, msg: 'Created new bootcamp!' });
});

/* 
    @desc Update Bootcamp
    @route PUT /api/v1/bootcamps/:id
    @access private
**/
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp not found with id:${req.params.id}`, 404)
    );
  res.status(200).json({
    success: true,
    msg: `Updated bootcamp ${req.params.id}`,
    data: bootcamp
  });
});

/* 
    @desc Delete Bootcamp
    @route DELTE /api/v1/bootcamps/:id
    @access private
**/
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp not found with id:${req.params.id}`, 404)
    );
  res.status(200).json({
    success: true,
    msg: `Deleted bootcamp ${req.params.id}`,
    data: bootcamp
  });
});

/* 
    @desc Delete Multiple Bootcamp
    @route DELTE /api/v1/bootcamps/
    @access private
**/

exports.bulkDeleteBootcamp = asyncHandler(async (req, res, next) => {
  let result = [];
  for (const element of req.body.id) {
    let bootcamp = await Bootcamp.findByIdAndDelete(element);
    if (!bootcamp) continue;
    result.push(bootcamp);
  }
  res.status(200).json({
    success: true,
    msg: `Toal Deleted bootcamp number:${result.length}`,
    data: result
  });
});

// @desc      Get bootcamps within a radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});
