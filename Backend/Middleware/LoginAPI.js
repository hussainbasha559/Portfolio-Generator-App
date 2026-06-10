app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    res.send("Login Success");
  } else {
    res.status(401).send("Invalid Credentials");
  }
});

res.redirect('/dashboard');