const express = require("express");
const mongoose = require("mongoose");
const  bodyParser = require("body-parser");
const app = express();

mongoose.connect("mongodb://localhost/students",  { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false}  );
app.use(bodyParser.json());

app.use("/api", require("./API/student"));
app.use("/api", require("./API/course"));
app.listen(4000, ()=>{
    console.log("server start")
});