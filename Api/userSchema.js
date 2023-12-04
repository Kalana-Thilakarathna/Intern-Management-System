const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    indexNo: { type:String, required:true, unique:true },
    userName: { type:String, required:true, unique:true },
    password: { type:String, required:true },
    role:{
        type:String,
        enum:['Admin','Student','Company'],
        default:'Student'
    },
    department:{
        type:String,
        enum:['ET','ICT','BST'],
        
    },
    batch:{type:String},
    email:{type:String},
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;