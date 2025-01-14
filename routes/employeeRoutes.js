const express = require('express');

const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({extended: true}));

const employeeModel = require('../model/employeeData');

function employeeroutes(nav){
  //get
  router.get("/", async (req, res) => {
    try {
      const data = await employeeModel.find();
      res.render("employeeList", {
        data,
        nav,
      });
    } catch (error) {
      res.status(404).send("Data not found");
    }
  });

  //get Add Employee Form
  router.get("/employeeForm", (req, res) => {
    res.render("addEmployee", {
      data: {},
      nav,
    });
  });

  //post
  router.post("/addEmployee", async (req, res) => {
    try {
      const item = new employeeModel(req.body); //Create a new document using the req.body
      const savedItem = await item.save(); // save the doc to the database
      res.redirect("/employees");
    } catch (error) {
      res.status(404).send("Post Unsuccessful");
    }
  });

  // Update Employee Form
  router.get("/updatepage/:id", async (req, res) => {
    try {
      const data = await employeeModel.findById(req.params.id); // Correct Mongoose method
      if (!data) {
        return res.status(404).send("Data not found");
      }
      res.render("updateEmployee", {
        nav,
        data,
        employeeid: req.params.id,
      });
    } catch (error) {
      console.error("Error fetching employee data:", error.message);
      res.status(500).send("Server error");
    }
  });

  //update
  router.post("/editEmployee/:id", async (req, res) => {
    try {
      const editData = await employeeModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.redirect("/employees");
    } catch (error) {
      res.status(404).send("Update UnSuccessful");
    }
  });

  // Delete Employee
  router.get("/delete/:id", async (req, res) => {
    try {
      const deletedEmployee = await employeeModel.findByIdAndDelete(
        req.params.id
      );
      if (!deletedEmployee) {
        return res.status(404).send("Employee not found");
      }
      res.redirect("/employees");
    } catch (error) {
      console.error("Error deleting employee:", error.message);
      res.status(500).send("Delete unsuccessful");
    }
  });

  return router;
}




module.exports = employeeroutes;