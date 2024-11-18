const express=require ('express');
const router=express.Router();
const jwt = require('jsonwebtoken'); 

router.use(express.json())
router.use(express.urlencoded({extended:true}));
const empolyeeModel=require('../models/employeeData')

// adding middleware function for token recheck


function verifyToken(req,res,next){
    let token=req.headers.token;
    try{
        if(!token) throw 'Unauthorised Access'
        let payload=jwt.verify(token,"secret")
        if(!payload)throw 'Unauthorised Access'
        next()
    }catch(error){
        res.json({message:error})
    }
}




// crud operation
router.get('/', verifyToken,async(req,res)=>{
    try {
        const empolyees=await empolyeeModel.find()
        res.status(200).send(empolyees);
    } catch (error) {
        res.status(404).send('empolyee not found');
        
    }
});


router.post('/addEmpolyee',verifyToken, async(req,res)=>{
    try {
        const empolyee=req.body;
        const newEmpolyee=new empolyeeModel(empolyee);
        const savedEmpolyee=await newEmpolyee.save();
        res.status(200).send('Empolyee added successfully');
    } catch (error) {
        console.error(error); // Log the actual error
        res.status(404).send('Error adding empolyee');
    }
});
router.put('/edit/:id',verifyToken,async(req,res)=>{
    try {
        const id=req.params.id;
        const updatedEmpolyee=await empolyeeModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).send('empolyee updated successfully');
    } catch (error) {
        res.status(404).send('Error updating empolyee');
    }
});
router.delete('/delete/:id',verifyToken,async(req,res)=>{
    try {
        const id=req.params.id;
        const deleteEmpolyee=await empolyeeModel.findByIdAndDelete(id,req.body,{new:true})
        res.status(200).send('empolyee deleted successfully');
    } catch (error) {
        res.status(404).send('Error deleting empolyee');
    }
});
module.exports = router;