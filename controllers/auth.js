const { response } = require('express');
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { getJWT, getRefreshJWT } = require('../helpers/jwt');

const crearUsuario = async(req,res= response)=>{

    try {
        const {email,password} = req.body;

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                ok:false,
                msg:'Ya existe un usuario con ese correo'
            })
        }

        user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt);

        await user.save();

        ///Generar JWT
        const token = await getJWT(user.id,user.name);
        const refreshtoken = await getRefreshJWT(user.id,user.name);

        // res.json({
        //     ok:true,
        //     uid:user.id,
        //     name:user.name
        // })

        res.status(201).json({
            success:true,
            status:201,
            user,
            token,
            message:'New User',
            refreshtoken
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            status:500,
            message:'Server Error'
        })
    }
    
    
}

const checkToken = async(req,res= response)=>{
    const {uid,name} = req;
    const token = await genereJWT(uid,name);
}

const loginUsuario = async(req,res= response)=>{

    try {

        const {email,password} = req.body;
        
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:'El usuario no existe'
            })
        }

        const validPassword = bcrypt.compareSync(password,user.password);

        if(!validPassword){
            return res.status(400).json({
                success:false,
                message:'Password no valido'
            });
        }

        const accessToken = await getJWT(user.id,user.name);
        const refreshToken = await getRefreshJWT(user.id,user.name);
        const username = user.id;

        const data={
            accessToken,
            refreshToken,
            username
        } 

        res.json({
            success:true,
            message:'Login Exitoso',
            data
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Por favor hable con el administrador'
        })
    }

   
}

const revalidarToken = async (req,res= response) =>{

    const {uid,name} = req;
    const accessToken = await getJWT(uid,name);
    const data = 
    {
        accessToken,
        username:uid
    }
    
    res.json({
        success:true,
        message:'Nuevo Token',
        data
    })
}

const getusername = async(req,res= response) =>{
    const {uid,name} = req;

    res.json({
        success:true,
        message:'User Data',
        username:uid
    })
}

module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken,
    getusername
}