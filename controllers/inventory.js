const { response } = require('express');
const Item = require("../models/ItemModel");



const addItem = async(req,res= response)=>{
    
    try {
        const {name,brand} = req.body;
        console.log(req.body)
        
        let item = await Item.findOne({name,brand});

        if(item){
            return res.status(400).json({
                success:false,
                message:'An element with that name already exists',
                status:400
            })
        }

        item = new Item(req.body);

        await item.save();

        console.log(item)

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

const getCollection =async(req,res= response)=>{
    try {

        let figures = await Item.find();

        if(figures.length>0){

            figures.sort(function (a, b) {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              });
            
            return res.status(200).json({
                figures,
                success:true,
                message:'Item added',
                status:201
            });
        }

        return res.status(200).json({
            success:true,
            message:'Collection Empty',
            status:200
        })
        

    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Error on server',
            status:500
        })
    }
}

module.exports={
    addItem,
    getCollection
}