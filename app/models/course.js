const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const CourseSchema = Schema({
    user : { type : Schema.Types.ObjectId , ref : 'User'},
    categories : [{ type : Schema.Types.ObjectId , ref : 'Category' }],
    title : { type : String , required : false },
    author : { type : String , required : false , default : 'بمب خنده' },
    slug : { type : String , required : true },
    body : { type : String , required : true },
    images : { type : Object , required : false , default : null },
    thumb : { type : String , required : false , default : ''},
    time : { type : Number , default :0 },
    timestamp : { type : Number , default :0 , unique :true }
} , { timestamps : true });

CourseSchema.plugin(mongoosePaginate);



CourseSchema.methods.path = function(){
    return `/post/${this.slug}`
};

module.exports = mongoose.model('Course' , CourseSchema);