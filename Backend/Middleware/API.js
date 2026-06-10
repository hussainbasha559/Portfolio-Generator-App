const User = require('./Middleware/userScheme');

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });
    await user.save();

    res.send("User Registered");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});