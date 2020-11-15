const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const studentArray = require('./InitialData');
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/api/student', (req, res) => {
    res.send(studentArray);
});

app.get('/api/student/:id', (req, res) => {
    const id = req.params.id;
    const student = studentArray.find(student => student.id === parseInt(id));

    if(!student) {
        res.status(404).send(`Student with id ${id} was not found!`);
        return;
    }
    res.send(student);
});

app.post('/api/student', (req, res) => {
    const {name, currentClass, division} = req.body;
    if((!name) || (!currentClass) || (!division)) {
        res.status(400);
        return;
    }

    const newStudent = {
        id: studentArray.length + 1,
        name: name,
        currentClass: currentClass,
        division: division
    };

    studentArray.push(student);

    res.send(newStudent.id);
});

app.put('/api/v1/student/:id', (req, res) => {
    const id = req.params.id;
    const student = data.find(student => student.id === parseInt(id));
    const newName = req.body.name;
    if((!student) || (!newName)) {
        res.status(400);
        return;
    }
    student.name = newName;

});
app.delete('/api/v1/student/:id', (req, res) => {
    const id = req.params.id;
    const studentIndex = data.findIndex((student) => parseInt(id) === student.id);
    if(studentIndex === -1) {
        res.status(400);
        return;
    }
    data.splice(studentIndex,1);
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   