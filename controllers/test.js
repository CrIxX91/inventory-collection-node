const { response } = require('express');

const testhandler = async(req,res= response)=>{
    return res.status(200).json({
        success:true,
        message:'Test Complete',
        status:200
    })
}


module.exports={
    testhandler
}