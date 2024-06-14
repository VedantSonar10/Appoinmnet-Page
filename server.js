const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path")

require("dotenv").config();

const app = express();

// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.get('/success', function (req, res) {
    res.sendFile(__dirname + '/success.html')
})
  
app.get("/oops", (req, res) => {
    res.send(__dirname+"/oops.html")
})

app.post("/submit-form", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const number = req.body.number;
    const date = req.body.date;
    const time = req.body.time;
    const business = req.body.business;
    const message = req.body.message;


    let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        
    },
})

let mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: message,
    text: `Name: ${username}\nEmail: ${email}\nNumber: ${number}\nDate: ${date}\nTime: ${time}\nBusiness: ${business}\nMessage: ${message}`, 


};


transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error)
    }
    else {
        res.redirect("/success")
    }
});



})

app.listen(3000, () => {
    console.log("listning at port 3000");
})