const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

 const { password: hashedPasswordFromDB, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
};


// Login Logic
const loginUser= async(userdata) =>{
  const {email,password}= userdata;
const User= await prisma.user.findUnique({
  where: {
    email
  },
});
if (!User) {
  throw new Error ("Invalid email or password");
}

const isMatch = await bcrypt.compare(
    password,
    User.password
);
  if (!isMatch) {
    throw new Error ("Invalid email or password");
  }
const token = jwt.sign(
  {
    id: User.id,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);
const { password: _, ...userWithoutPassword } = User;
return {
  token,
  user: userWithoutPassword,
};

};

module.exports = {
  registerUser,
  loginUser,
};



