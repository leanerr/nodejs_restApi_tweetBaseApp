const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('app/http/controllers/admin/adminController');
const courseController = require('app/http/controllers/admin/courseController');
const categoryController = require('app/http/controllers/admin/categoryController');
const tabliqController = require('app/http/controllers/admin/tabliqController');

// validators 
const courseValidator = require('app/http/validators/courseValidator');
const categoryValidator = require('app/http/validators/categoryValidator');
const tabliqValidator = require('app/http/validators/tabliqValidator');

// Helpers
const upload = require('app/helpers/uploadImage');

// Middlewares
const convertFileToField = require('app/http/middleware/convertFileToField');

router.use((req , res , next) => {
    res.locals.layout = "admin/master";
    next();
});

// Admin Routes
router.get('/' , adminController.index);
router.get('/courses' , courseController.index);
router.get('/courses/create' , courseController.create);
router.post('/courses/create' ,
    upload.single('images') ,
    convertFileToField.handle ,
    courseValidator.handle() ,
    courseController.store
);
router.get('/courses/:id/edit' , courseController.edit);
router.put('/courses/:id' ,
    upload.single('images') ,
    convertFileToField.handle ,
    courseValidator.handle() ,    
    courseController.update
);
router.delete('/courses/:id' , courseController.destroy);



// tabliq Routes
router.get('/tabliq' , tabliqController.index);
router.get('/tabliq/create' , tabliqController.create);
router.post('/tabliq/create' ,
    upload.single('images') ,
    tabliqValidator.handle() ,
    convertFileToField.handle ,
    tabliqController.store
);
router.get('/tabliq/:id/edit' ,tabliqController.edit);
router.put('/tabliq/:id' ,
    upload.single('images') ,
    tabliqValidator.handle() ,
    convertFileToField.handle ,
    tabliqController.update
);
router.delete('/tabliq/:id' , tabliqController.destroy);



router.post('/upload-image' ,upload.single('upload') ,adminController.uploadImage);

// Category Routes
router.get('/categories' , categoryController.index);
router.get('/categories/create' , categoryController.create);
router.post('/categories/create' , categoryValidator.handle() , categoryController.store );
router.get('/categories/:id/edit' , categoryController.edit);
router.put('/categories/:id' , categoryValidator.handle() , categoryController.update );
router.delete('/categories/:id' , categoryController.destroy);


module.exports = router;