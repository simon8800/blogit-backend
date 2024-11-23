const bcrypt = require("bcryptjs");

// Generate a salt asynchronously with 10 salt rounds
const genPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

// Validate password against hash
const validPassword = async (password, hash) => {
  const results = await bcrypt.compare(password, hash);
  return results;
};

module.exports = { genPassword, validPassword };
