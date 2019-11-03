const controller = require('app/http/controllers/api/controller');
const Course = require('app/models/course');
const Tabliq = require('app/models/tabliq');
const Category = require('app/models/category');



class courseController extends controller {
    
    async courses(req , res , next) {
        try {
            let page = req.query.page || 1;
            let posts = await Course.paginate({} , { page , sort : { createdAt : 1 } , limit : 60 });

            res.json({
                data : this.filterPostsData(posts),
                status : 'success'
            })

        } catch (err) {
            this.failed(err.message , res);
        }
    }

    filterPostsData(posts) {
        return {
            ...posts,
            docs : posts.docs.map(posts => {
                return {
                    id : posts.id,
                    title : posts.title,
                    slug : posts.slug,
                    body : posts.body,
                    image : posts.images,
                    timestamp : posts.timestamp,
                    categories : posts.categories.map(cate => {
                        return {
                            name : cate.name,
                            slug : cate.slug
                        }
                    }),

                    createdAt : posts.createdAt
                }
            })
        }
    }

    async categories(req , res ,next ) {
        try {
            let categories = await Category.find({ parent : null }).populate('childs').exec();
            res.json({data :categories})
        } catch (err) {
            this.failed(err.message , res);
        }
    }
    async tabliq(req , res , next) {
        try {

            let page = req.query.page || 1;
            let tabliq = await Tabliq.paginate({} , { page , sort : { createdAt : 1 } , limit : 5 });

            res.json({
                data : this.filterTabliqData(tabliq),
                status : 'success'
            })

        } catch (err) {
            this.failed(err.message , res);
        }
    }

    filterTabliqData(tabliq) {
        return {
            ...tabliq,
            docs : tabliq.docs.map(tabliq => {
                return {
                    id : tabliq.id,
                    title : tabliq.title,
                    slug : tabliq.slug,
                    link : tabliq.link,
                    body : tabliq.body,
                    image : tabliq.images,
                    thumb : tabliq.thumb,
                    createdAt : tabliq.createdAt
                }
            })
        }
    }
    async singleCourse(req , res) {
        try {
            let post = await Course.findByIdAndUpdate(req.params.post )
                                            .populate([
                                                {
                                                    path : 'user',
                                                    select : 'name'
                                                }
                                            ]);
            if(! post ) return this.failed('چنین پستی یافت نشد', res , 404);


            res.json({
                data : post,
                status : 'success'
            })

        } catch (err) {
           this.failed(err.message , res);
        }
    }


}

module.exports = new courseController();