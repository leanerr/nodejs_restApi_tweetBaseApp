const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const TabliqSchema = Schema({
    title : { type : String , required : false },
    body : { type : String , required : false },
    link : { type : String , required : true },
    images : { type : Object , required : false },
    slug : { type : String , required : true },
    thumb : { type : String , required : false }
} , { timestamps : true });

TabliqSchema.plugin(mongoosePaginate);





module.exports = mongoose.model('Tabliq' , TabliqSchema);