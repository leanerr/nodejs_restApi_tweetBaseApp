const validator = require('./validator');
const { check } = require('express-validator/check');
const Course = require('app/models/course');
const path = require('path');

class courseValidator extends validator {

    handle() {
        return [
            check('title')
                .custom(async (value , { req }) => {
                    if(req.query._method === 'put') {
                        let course = await Course.findById(req.params.id);
                        if(course.title === value) return;
                    }
                    let course = await Course.findOne({ slug : this.slug(value) });
                    if(course) {
                        throw new Error('چنین پستی  با این عنوان قبلا در سایت قرار داد شده است')
                    }
                }),

            // check('images')
            //     .custom(async (value , { req }) => {
            //         if(req.query._method === 'put' && value === undefined) return ;
            //         if(! value)
            //             throw new Error('وارد کردن تصویر الزامی است');
            //
            //         let fileExt = ['.png' , '.jpg' , '.jpeg' , '.svg'];
            //         if(! fileExt.includes(path.extname(value)))
            //             throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست')
            //     }),



            check('body')
                .isLength({ min : 8 })
                .withMessage('متن پست نمیتواند کمتر از 8 کاراکتر باشد')

        ]
    }


    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g , "-")
    }
}

module.exports = new courseValidator();