const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

let studentArray =require("./InitialData.js");

app.get('/api/student',(req,res)=>{
    res.send(studentArray);
    return;
})

app.get("/api/student/:id",(req,res)=>{
    let flag=false;
    studentArray.forEach((student)=>{
        if(+student.id===+req.params.id){
            res.send(student);
            flag=true;
            return;
        }
    })
    if(!flag){
        res.status(404).send("Student not found");
        return;
    }
});

let index=8;

app.post("/api/student",(req,res)=>{
    if(req.body.name===undefined || req.body.division===undefined || req.body.currentClass===undefined){
        res.status(400).send("Incomplete data");
        return;
    }
    else{
        studentArray=[...studentArray,{"id":index,"name":req.body.name,"currentClass":Number(req.body.currentClass),"division":req.body.division}];
        res.json({'id':index});
        index++;
        return;
    }
})


app.put("/api/student/:id",(req,res)=>{
    let count=0;
    let flag=false;
    studentArray.forEach((student)=>{
        if(+student.id===+req.params.id){
            flag=true;
            return;
        }
    })
    if(!flag){
        res.status(400).send("Student not found");
        return;
    }
    let found = false;
    let validKey = ["name","currentClass","division"];
    for(let i =0; i<Object.keys(req.body).length; i++){
        found = validKey.includes(Object.keys(req.body)[i]);
    }
    if(!found){
        res.status(400).send("invalid keys");
        return;
    }
    if(req.body.name===undefined){
        count++;
    }
    else{
        studentArray.forEach((student)=>{
            if(+student.id===+req.params.id){
                student.name=req.body.name;
            }
        });
    }
    if(req.body.currentClass===undefined){
        count++;
    }
    else{
        studentArray.forEach((student)=>{
            if(+student.id===+req.params.id){
                student.currentClass=Number(req.body.currentClass);
            }
        });
    }
    if(req.body.division===undefined){
        count++;
    }
    else{
        studentArray.forEach((student)=>{
            if(+student.id===+req.params.id){
                student.division=req.body.division;
            }
        });
    }
    if(count!==3){
        res.send("updated");
        return;
    }
    else{
        res.status(400).send("no update");
        return;
    }
})

app.delete("/api/student/:id",(req,res)=>{
    let flag=false;
    studentArray.forEach((student,index)=>{
        if(+student.id===+req.params.id){
            flag=true;
            studentArray.splice(index,1);
        }
    })
    if(flag){
        res.send("deleted");
        return;
    }
    else{
        res.status(404).send("student not found");
        return;
    }    
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   