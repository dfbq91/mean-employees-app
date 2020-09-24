const express = require("express");
const router = express.Router();

const employeesController = require("../controllers/employees.controller");

router.get("/", employeesController.getEmployees);
router.post("/", employeesController.createEmployee);
router.get("/:id", employeesController.getEmployee);
router.put("/:id", employeesController.editEmployee);
router.delete("/:id", employeesController.deleteEmployee);

module.exports = router;