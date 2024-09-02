import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Check if a user exists with the same username
    const existingUsername = await prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUsername) {
      return res.status(409).json({ message: "Username already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user");
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error logging in user");
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
