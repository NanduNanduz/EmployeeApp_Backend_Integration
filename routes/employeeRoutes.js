const express = require('express');

const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({extended: true}));

const employeeModel = require('../model/employeeData');

function employeeroutes(nav){


return router;
}









module.exports = employeeroutes;