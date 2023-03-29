const { Schema,model } = require("mongoose");

const BrandSchema = Schema({
    
    name:{
        type:String,
        require:true
    }
    
});


module.exports= model('Brand',BrandSchema);