const express = require('express');
const router = express.Router();
const moment = require('moment');
const employees = require('../../Employees');


// Endpoint to retrieve all employees
router.get('/', (req, res) => {
    res.json(employees);
});

// Endpoint to retrieve employee by name
router.get('/:name', (req, res) => {
    const employee = employees.find(e => e.name.toLowerCase() === req.params.name.toLowerCase());
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
});


// Endpoint to retrieve employee by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const employee = employees.find(emp => emp.id === parseInt(id));

    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(employee);
});


// Endpoint to add new employee
router.post('/', (req, res) => {
    const { name, email, age, department, } = req.body;

    if (!name ||!email ||!age ||!department) return res.status(400).json({ message: 'Missing required fields' });

    const newEmployee = {
        id: employees.length + 1,
        name,
        email,
        age,
        department,
        added: moment().format('YYYY-MM-DD HH:mm:ss')
        //hireDate: moment(hireDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
    };

    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});


// Endpoint to update employee list
router.put('/', (req, res) => {
    const { id } = req.params;
    const { name, email, age, department } = req.body;

    const employee = employees.find(emp => emp.id === parseInt(id));

    if (!employee) {
        return res.status(404).json({ error: 'Employee does not exist' });
    }

    if (name) employee.name = name;
    if (email) employee.email = email;
    if (age) employee.age = age;
    if (department) employee.department = department;
    employee.updated = moment().format('YYYY-MM-DD HH:mm:ss');

    res.json({mgs: `Employee update`, employee});
});


// Endpoint to update an existing employee by name
router.put('/:name', (req, res) => {
    const { name } = req.params;
    const { newName, email, age, department } = req.body;

    const employee = employees.find(emp => emp.name.toLowerCase() === name.toLowerCase());

    if (!employee) {
        return res.status(404).json({ error: 'Employee doee not exist' });
    }

    const updateEmployee = req.body;

    if (newName) employee.name = newName;
    if (email) employee.email = email;
    if (age) employee.age = age;
    if (department) employee.department = department;
    employee.name = updateEmployee ? updateEmployee.name : employee.name;

    res.json({mgs: `Employee updated`, employee});

});


// Endpoint to delete an existing employee by id

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = employees.findIndex(emp => emp.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Employee does not exist' });
    }

    employees.splice(index, 1);
    res.json({ message: 'Employee deleted' });
});


// Endpoint to delete an employee by name
router.delete('/:name', (req, res) => {
    const { name } = req.params;
    const index = employees.findIndex(emp => emp.name.toLowerCase() === name.toLowerCase());

    if (index === -1) {
        return res.status(404).json({ error: 'Employee does not exist' });
    }

    employees.splice(index, 1);
    res.json({ message: 'Employee deleted' });
});
 



module.exports = router;