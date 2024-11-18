const mongoose=require ('mongoose');
const empolyeeSchema=new mongoose.Schema({
    empolyeeImage:String,
    empolyeeId:String,
    empolyeeName:String,
    empolyeeCategory:String,
    empolyeeDescription:String,
    empolyeeFee:Number
})
const  empolyeeData=mongoose.model('empolyees',empolyeeSchema);
module.exports=empolyeeData;