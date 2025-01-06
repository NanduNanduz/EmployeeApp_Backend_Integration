const mongoose = require('mongoose');//import mongoose

//Create Schema
const employeeSchema = mongoose.Schema({
    employeeName : String,
    employeeDesignation :String,
    employeeLocation : String,
    employeeSalary : Number
})

const employeeData = mongoose.model('employee', employeeSchema);//mapping schema to the collection

module.exports = employeeData;//export particular schema