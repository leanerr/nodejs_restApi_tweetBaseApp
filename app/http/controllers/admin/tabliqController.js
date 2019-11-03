const controller = require('app/http/controllers/controller');
const Tabliq = require('app/models/tabliq');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

class tabliqController extends controller {

    async index(req , res) {
        try {
            let page = req.query.page || 1;
            let tabliq = await Tabliq.paginate({} , { page , sort : { createdAt : -1 } , limit : 6 });
            res.render('admin/tabliq/index',  { title : 'tabliq' , tabliq });
        } catch (err) {
            next(err);
        }
    }

    async create(req , res) {



        res.render('admin/tabliq/create', );
    }

    async store(req , res , next) {
        try {
            let status = await this.validationData(req);
            if(! status) {
                if(req.file)
                    fs.unlinkSync(req.file.path);
                return this.back(req,res);
            }

            // create course
            let images = this.imageResize(req.file);
            // let time = new Date().getTime();
            let { title , body   , link  } = req.body;

            let newTabliq = new Tabliq({
                user : req.user._id,
                title,
                link,
                slug : this.slug(title),
                body,
                images ,
                thumb : images['small']
            });

            await newTabliq.save();

            return res.redirect('/admin/tabliq');
        } catch(err) {
            next(err);
        }
    }

    async edit(req, res ,next) {
        try {
            this.isMongoId(req.params.id);

            let tabliq = await Tabliq.findById(req.params.id);
            if( ! tabliq ) this.error('چنین تبلیغ ای وجود ندارد' , 404);

            return res.render('admin/tabliq/edit' , { tabliq  });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res , next) {
        try {
            let status = await this.validationData(req);
            if(! status) {
                if(req.file)
                    fs.unlinkSync(req.file.path);
                return this.back(req,res);
            }

            let objForUpdate = {};

            // set image thumb
            objForUpdate.thumb = req.body.imagesThumb;

            // check image
            if(req.file) {
                objForUpdate.images = this.imageResize(req.file);
                objForUpdate.thumb = objForUpdate.images['small'];
            }

            delete req.body.images;
            objForUpdate.slug = this.slug(req.body.title);

            await Tabliq.findByIdAndUpdate(req.params.id , { $set : { ...req.body , ...objForUpdate }});
            return res.redirect('/admin/tabliq');
        } catch(err) {
            next(err);
        }
    }

    async destroy(req , res) {
        try {
            this.isMongoId(req.params.id);

            let tabliq = await Tabliq.findById(req.params.id);
            if( ! tabliq ) this.error('وجود ندارد' , 404);

            // delete episodes

            // delete Images
            Object.values(tabliq.images).forEach(image => fs.unlinkSync(`./public${image}`));

            // delete courses
            tabliq.remove();

            return res.redirect('/admin/tabliq');
        } catch (err) {
            next(err);
        }
    }

    imageResize(image) {

            const imageInfo = path.parse(image.path);

        let addresImages = {};
        addresImages['original'] = this.getUrlImage(`${image.destination}/${image.filename}`);

        const resize = size => {
            let imageName = `${imageInfo.name}-${size}${imageInfo.ext}`;

            let name = size === 480 ? 'small' : 720 ? 'medium' : 1080 ? 'large' : 'undefined_size';

            addresImages[name] = this.getUrlImage(`${image.destination}/${imageName}`);

            sharp(image.path)
                .resize(size , null)
                .toFile(`${image.destination}/${imageName}`);
        }

        [1080 , 720 , 480].map(resize);

        return addresImages;
    }

    getUrlImage(dir) {
        return dir.substring(8);
    }

    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g , "-")
    }
}

module.exports = new tabliqController();