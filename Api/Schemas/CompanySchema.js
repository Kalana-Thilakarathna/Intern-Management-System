const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    indexNo: { type:String, required:true, unique:true },
    userName: { type:String, required:true, unique:true },
    vacancies:[{type:String}],
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
module.exports = Company;