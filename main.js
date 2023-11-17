const express = require("express")
const mysql = require("mysql")

const app = express() /// creating our server application that can liste to http requests and send back responses


app.get("/", (req,res)=>{
    res.send("Hello there , a response from your server")
})

app.listen(3000)
