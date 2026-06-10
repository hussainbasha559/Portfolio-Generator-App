const express = require('express')
const connectDB = require('./db')   
require('dotenv').config();    
const User = require('./Middleware/userScheme');      

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect database
connectDB();   

const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

const myAth = function (req, res, next) {
  console.log('authentication');
  next();
};

app.use(myAth);

app.get('/', (req, res) => {
     res.sendFile('./LoginPage.html',
        {root:__dirname});
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save(); 

    console.log("User saved:", newUser);

    res.redirect("/dashboard");

  } catch (err) {
     console.log("🔥 FULL ERROR 👉", err);

    if (err.code === 11000) {
      return res.send("User already exists");
    }

    res.send("Error saving user");
  }
});

app.get('/dashboard', (req, res) => {
  res.sendFile('./Dashboard.html',
    {root:__dirname}
  )
});

app.get('/portfolio-form', (req, res) => {
  res.sendFile('./portfolio.html', {
    root: __dirname
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
