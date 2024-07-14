const express = require('express');
const employees = require('./Employees');

const app = express();

// Middleware to parse JSON bodies 
app.use(express.json()); 

// setup routes
app.use('/api/employees', require('./routes/api/employees')); 



const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));