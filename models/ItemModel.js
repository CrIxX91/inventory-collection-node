const { Schema,model } = require("mongoose");

const ItemSchema = Schema({
    
    name:{
        type:String,
        require:true
    },
    brand:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },

});


module.exports= model('Item',ItemSchema);