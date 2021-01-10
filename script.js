const express = require('express'); //Import Express
const Joi = require('joi'); //Import Joi
const app = express(); //Create Express Application on the app variable
app.use(express.json()); //use the json file
 
//Give data to the server
const students = [
{name: 'Amrita', id: 1},
{name: 'Swathi', id: 2},
{name: 'Mark', id: 3},
{name: 'John', id: 4},
{name: 'Aishik', id: 5}
]

// RECAP 1
 
//Read Request Handlers
// Display the Message when the URL consist of '/'
app.get('/', (req, res) => {
res.send('Welcome to IEEE NTU\'s REST API Workshop!');
});
// Display the List Of students when URL consists of api students
app.get('/api/students', (req,res)=> {
res.send(students);
});
// Display the Information Of Specific student when you mention the id.
app.get('/api/students/:id', (req, res) => {
const student = students.find(c => c.id === parseInt(req.params.id));
//If there is no valid student ID, then display an error with the following message
if (!student) res.status(404).send(
    '<h2 style="font-family: Malgun Gothic; color: darkred;"> Ooops... Cant find what you are looking for!</h2>');
res.send(student);
});

//RECAP 2 (GET)
 
//CREATE Request Handler
//CREATE New student Information
app.post('/api/students', (req, res)=> {
 
const { error } = validatestudent(req.body);
console.log(error)
if (error){
res.status(400).send(error.details[0].message)
return;
}
//Increment the student id
const student = {
id: students.length + 1,
name: req.body.name
};
students.push(student);
res.send(student);
});

// RECAP 3 (POST + validate function)
 
//Update Request Handler
// Update Existing student Information
app.put('/api/students/:id', (req, res) => {
const student = students.find(c=> c.id === parseInt(req.params.id));
if (!student) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
 
const { error } = validatestudent(req.body);
if (error){
res.status(400).send(error.details[0].message);
return;
}
 
student.name = req.body.name;
res.send(student);
});

// RECAP 4
 
//Delete Request Handler
// Delete student Details
app.delete('/api/students/:id', (req, res) => {
 
const student = students.find( c => c.id === parseInt(req.params.id));
if(!student) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!!</h2>');
 
const index = students.indexOf(student);
students.splice(index,1);
 
res.send(student);
});

// RECAP 5

//Validate Information
function validatestudent(student) {

const schema = Joi.object({
name: Joi.string().min(3).required()
});

return schema.validate(student)
 
}
 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
