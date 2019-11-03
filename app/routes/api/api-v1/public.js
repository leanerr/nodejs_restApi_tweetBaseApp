const express = require('express');
const router = express.Router();

// Controllers
const CourseController = require('app/http/controllers/api/v1/courseController');

router.get('/courses' , CourseController.courses);
router.get('/categoreis' , CourseController.categories);
router.get('/tabliq' , CourseController.tabliq);
router.get('/courses/:course' , CourseController.singleCourse);


module.exports = router;