const User = require("../models/User");

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.signup(name, email, password);
    const token = await user.createJWT();
    res.status(201).json({
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("Email does not exist");
    }
    const match = await user.comparePassword(password);
    if (!match) {
      throw Error("Incorrect password");
    }
    const token = await user.createJWT();

    res.status(200).json({ email, token, name: user.name, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
