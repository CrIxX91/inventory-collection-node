const { response } = require("express");
const jwt = require("jsonwebtoken");

const jwtValidator = (req,res = response,next)=>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            success:false,
            message:'No hay token'
        })
    }

    try {

        const {uid,name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            success:true,
            message:'Token no valido'
        })
    }

    next();

}

module.exports={
    jwtValidator
}