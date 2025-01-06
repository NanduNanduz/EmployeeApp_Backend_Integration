const express = require('express');//import express
const app = new express;//instance of express

const morgan = require('morgan')//import morgan
app.use(morgan('dev'))// Morgan middleware - 3rd party

require('dotenv').config();//import dotenv
require('./db/connection');

const nav = [{link:'/employees',name: 'Home'},{link:'/employees/addEmployee',name:'Add Employees'}];

const employeeRoutes = require('./routes/employeeRoutes')(nav)//import employeeRoutes file
app.use('/employees',employeeRoutes)// Redirect all "/employees" requests to employeeRoutes

app.set('view engine', 'ejs');// set ejs as view engine
app.set('views',__dirname + '/views');

app.use(express.static('public'));



app.listen(process.env.PORT,()=>{
    console.log(`Server is running ${process.env.PORT}`);
})
