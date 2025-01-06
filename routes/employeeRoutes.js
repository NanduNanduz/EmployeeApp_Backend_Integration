const express = require('express');

const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({extended: true}));

const employeeModel = require('../model/employeeData');

function employeeroutes(nav){

    //get
    router.get('/', async(req , res)=>{
        try {
            const data = await employeeModel.find();
            res.render('employeeList',{
                data,nav
            })
        } catch (error) {
            res.status(404).send('Data not found');
            
        }
    })


return router;
}









module.exports = employeeroutes;