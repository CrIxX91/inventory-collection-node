const { response } = require('express');
const Brand = require("../models/BrandModel");


const addBrand = async(req,res= response)=>{
    
    try {

        const { name } = req.body;
        let brand = await Brand.findOne({name});
    
        if(brand){
            return res.status(400).json({
                success:false,
                message:'An element with that name already exists',
                status:400
            })
        }

        brand = new Brand(req.body);

        await brand.save();

        res.status(201).json({
            uid:brand.id,
            success:true,
            message:'Brand added',
            status:201
        });

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Error on server',
            status:500
        })
    }
}

const getBrands = async(req,res= response)=>{

    try {
        let brands = await Brand.find();
        if(!brands){
            return res.status(400).json({
                success:false,
                message:'list is empty',
                status:400
            })
        }

        // brand = new Brand(req.body);

        // await brand.save();

        res.status(201).json({
            brands,
            success:true,
            message:'Brand list',
            status:201
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Error on server',
            status:500
        })
    }
}

module.exports={
    addBrand,
    getBrands
}