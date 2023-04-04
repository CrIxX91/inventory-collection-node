const jwt = require("jsonwebtoken");


const getJWT =( uid,name )=>{
    return new Promise((resolve,reject)=>{
        const payload ={uid,name};

        jwt.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn:'1h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo obtener el token');
            }
            resolve(token);
        })

    })
}

const getRefreshJWT =( uid,name )=>{
    return new Promise((resolve,reject)=>{
        const payload ={uid,name};

        jwt.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn:'1h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo obtener el token');
            }
            resolve(token);
        })

    })
}

module.exports={
    getRefreshJWT,
    getJWT
}