import express from "express";
const router = express.Router();
export default router;

import {
  getEmployee,
  getEmployees,
  randomEmployee,
  addEmployee,
} from "#db/employees";

router.get("/", (req, res) => {
  const employees = getEmployees();
  res.send(employees);
});

router.post("/", (req, res) => {
  if (!req.body) return res.status(400).send("Request must have a body.");

  const { name } = req.body;
  if (!name)
    return res.status(400).send("New employee submission must have a name.");

  const employee = addEmployee(name);
  res.status(201).send(employee);
});

router.get("/random", (req, res) => {
  const employee = randomEmployee();
  res.send(employee);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const employee = getEmployee(+id);

  if (!employee) {
    return res.status(404).send("That employee doesn't exist.");
  }

  res.send(employee);
});
