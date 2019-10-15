require("dotenv").config()
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var router = require("./application/router/index.js") // mac dinh no se tro? toi index.js
var morgan = require("morgan")
const app = express();

app.use(cors({
    origin: ['https://smart-exam-25.herokuapp.com','https://smart-exam-25-back.herokuapp.com'],
    credentials: true,
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true})) 

require("./config/passport")

app.use(router);
app.use(morgan("dev"))
app.get("/" , (req,res)=>{
    res.json({
        hello : "world"
    })
})



// const PORT = process.env.PORT;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{ console.log(`Running on port ${PORT}`)
})

