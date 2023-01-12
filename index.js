var exp = require("express");
var app = exp();
const port = 3200;
const storage = require("node-persist");
var bodyParser = require("body-parser");
const { values, keys } = require("node-persist");

var jsonParser = bodyParser.json();
storage.init();
app.use(exp.json());

app.post("/allstudent", jsonParser, async (req, res) => {
    const { id, name, gpa } = req.body;
    await storage.setItem(id, { id: id, name: name, gpa: gpa });

    res.send("Student Detailes added sucsessfully");
});

app.get("/allStudent", async (req, res) => {

    let code = `<h1>All Student Details!</h1>`;

    students = await storage.values();
    for (let i = 0; i < students.length; i++) {
        code += `<h2>Student_id:${students[i].id}</h2>
                 <h3>Name:${students[i].name}</h3>
                 <h3>GPA:${students[i].gpa}</h3>
                 <br>`
    }
    res.send(code);
});

app.get("/student/:id", async (req, res) => {

    let code = `<h1>Student Details!</h1>`;
    let student = await storage.getItem(req.params.id);

    let msg = code += `<h2>Student_id:${student.id}</h2>
                       <h3>Name:${student.name}</h3>
                       <h3>GPA:${student.gpa}</h3>`;
    res.send(msg);
});

app.get("/topper", async (req, res) => {

    students = await storage.values();
    let highestGpa = 0;
    let Id = 0;
    for (let i = 0; i < students.length; i++) {
        if (Number(students[i].gpa) > highestGpa) {
            highestGpa = Number(students[i].gpa);
            Id = students[i].id;
        }
    }
    let student = await storage.getItem(Id);

    let code = `<h1>Student Details!</h1>`;

    code += `<h2>Student id: ${student.id}</h2>
              <h3>Name: ${student.name}</h3>
              <h3>GPA: ${student.gpa}</h3> 
              <br/>`;

    res.send(code);

});
app.listen(port, () =>
    console.log(`Server is starting on port=>${port}`)
);