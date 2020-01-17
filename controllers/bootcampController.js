const mongoose = require('mongoose');
const Bootcamp = require('../models/Bootcamp');

/* 
    @desc Get All Bootcamps
    @route GET /api/v1/bootcamps
    @access public
**/
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, msg: 'show all bootcamps!', data: bootcamps });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

/* 
    @desc Get Single Bootcamp
    @route GET /api/v1/bootcamps/:id
    @access public
**/
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp)
      return res.status(400).json({ success: false, msg: 'Not found' });
    res.status(200).json({
      success: true,
      msg: `Get bootcamp ${req.params.id}`,
      data: bootcamp
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

/* 
    @desc Create New Bootcamp
    @route POST /api/v1/bootcamps
    @access private
**/
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res
      .status(201)
      .json({ success: true, data: bootcamp, msg: 'Created new bootcamp!' });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

/* 
    @desc Update Bootcamp
    @route PUT /api/v1/bootcamps/:id
    @access private
**/
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!bootcamp)
      return res.status(400).json({ success: false, msg: 'Not found' });
    res.status(200).json({
      success: true,
      msg: `Updated bootcamp ${req.params.id}`,
      data: bootcamp
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

/* 
    @desc Delete Bootcamp
    @route DELTE /api/v1/bootcamps/:id
    @access private
**/
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp)
      return res.status(400).json({ success: false, msg: 'Not found' });
    res.status(200).json({
      success: true,
      msg: `Deleted bootcamp ${req.params.id}`,
      data: bootcamp
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

/* 
    @desc Delete Multiple Bootcamp
    @route DELTE /api/v1/bootcamps/
    @access private
**/

exports.bulkDeleteBootcamp = async (req, res, next) => {
  try {
    console.log(req.body.id);
    let arr = [...req.body.id];
    let res = [];
    arr.forEach(async element => {
      let bootcamp = await Bootcamp.findByIdAndDelete(element);
      res.push(bootcamp);
    });
    res.status(200).json({
      success: true,
      msg: `Deleted bootcamp ${req.params.id}`,
      data: res
    });
  } catch (error) {
    res.status(400).json({ success: false, err: error });
  }
};
