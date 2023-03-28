const { response } = require('express');
const Item = require("../models/ItemModel");


const addItem = async(req,res= response)=>{
    
    try {
        const {name} = req.body;

        let item = await Item.findOne({name});

        if(item){
            return res.status(400).json({
                success:false,
                message:'An element with that name already exists',
                status:400
            })
        }

        item = new Item(req.body);

        await item.save();

        res.status(201).json({
            uid:item.id,
            success:true,
            message:'Item added',
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
    addItem
}