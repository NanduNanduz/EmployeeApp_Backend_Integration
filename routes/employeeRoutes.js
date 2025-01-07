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

    //post
    router.post('/addEmployee',async(req,res)=>{
        try {
            const item = new employeeModel(req.body); //Create a new document using the req.body
            const savedItem = await item.save();// save the doc to the database
            res.redirect('/employees');          
        } catch (error) {
            res.status(404).send("Post Unsuccessful")
            
        }
    })

    //update
    router.post('/editEmployeee/:id',async(req,res)=>{
        try {
            const editData = await employeeModel.findByIdAndUpdate(req.params.id, req.body);
            res.redirect('/employees')
            
        } catch (error) {
            res.status(404).send("Update UnSuccessful");
            
        }
    })


    //delete
    router.delete('/delete/:id', async(req,res)=>{
        try {
            const deleteData = await employeeModel.findByIdAndDelete(req.params.id);
            if(deleteData){
                res.status(200).send('Delete Successful')
            }
        } catch (error) {
            res.status(404).send('Delete Unsuccessful')
            
        }
    })

return router;
}




module.exports = employeeroutes;