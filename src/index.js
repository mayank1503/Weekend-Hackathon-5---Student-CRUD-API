const express = require('express')

const students = require('./InitialData')

const app = express()
const bodyParser = require("body-parser");
const { json } = require('express');
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get('/api/student', (request, response)=>{   //whole data
    response.send(students);
});

let idProp = students.length;

app.get('/api/student/:id', (request, response)=>{   //get by id
    const id = parseInt(request.params.id);
    console.log(id);
    if(isNaN(id)){
        response.sendStatus(404);
        console.log('pp');
        return;
    }

    const student = students.find(stud=>stud.id === id);
    if(!student){
        response.sendStatus(404);
        return;
    }     
    response.send(student);
});
app.post('/api/student',(request, response)=>{
    const newStudent = request.body;
    if(!newStudent.name || !newStudent.currentClass || !newStudent.division){
        response.sendStatus(400);
        return;
    }

    students.push({
        id: idProp+1,
        name: newStudent.name,
        currentClass: parseInt(newStudent.currentClass),
        division: newStudent.division
    });

    idProp++;
    response.send({
        id: idProp
    });
});
app.put('/api/student/:id', (request, response)=>{
    const id = parseInt(request.params.id);
    if(isNaN(id)){
        response.sendStatus(400);
        return;
    }
    const studentIndex = students.findIndex(stud => stud.id === id);

    if(studentIndex === -1){
        response.sendStatus(400);
        return;
    }

    const student = students[studentIndex];
    if(request.body.name){
        students[studentIndex].name=request.body.name;
    }
    if(request.body.currentClass){
        students[studentIndex].currentClass=parseInt(request.body.currentClass);
    }
    if(request.body.division){
        students[studentIndex].division=request.body.division;
    }
    response.set("content-type", "application/x-www-form-urlencoded");
    response.send( {name:request.body.name});
});
app.delete('/api/student/:id', (request, response)=>{
    const id = parseInt(request.params.id);
    if(isNaN(id)){
        response.sendStatus(404);
        return;
    }
    const studentIndex = students.findIndex(stud => stud.id === id);
    
    if(studentIndex === -1){
        response.sendStatus(404);
        return;
    } 
    students.splice(studentIndex, 1);
    response.sendStatus(200);
});
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   