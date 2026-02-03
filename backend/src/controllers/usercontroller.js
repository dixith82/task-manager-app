const bcrypt = require('bcrypt');
const saltRounds = 10;

// In register function
const hashedPassword = await bcrypt.hash(password, saltRounds);
const newUser = await User.create({
  name,
  email,
  password: hashedPassword,
});

// In login function
const user = await User.findOne({ email });
if (!user) {
  return res.status(401).json({ message: 'Invalid credentials' });
}

const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
  return res.status(401).json({ message: 'Invalid credentials' });
}