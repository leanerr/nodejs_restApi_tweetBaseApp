const validator = require('./validator');
const { check } = require('express-validator/check');
const Tabliq = require('app/models/tabliq');
const path = require('path');

class tabliqValidator extends validator {

    handle() {
        return [
            check('title')
                .custom(async (value , { req }) => {
                    if(req.query._method === 'put') {
                        let course = await Tabliq.findById(req.params.id);
                        if(course.title === value) return;
                    }
                    let course = await Tabliq.findOne({ slug : this.slug(value) });
                    if(course) {
                        throw new Error('چنین پستی  با این عنوان قبلا در سایت قرار داد شده است')
                    }
                })






        ]
    }


    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g , "-")
    }
}

module.exports = new tabliqValidator();