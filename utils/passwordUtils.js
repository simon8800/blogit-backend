const bcryptjs = require("bcryptjs");

/**
 * Generate a salt asynchronously with 10 salt rounds
 * @param {string} password user's password
 * @returns {string} hashed password
 */
const genPassword = async (password) => {
  try {
    const hash = await bcryptjs.hash(password, 10);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Validate password against hash
 * @param {string} password user's password
 * @param {string} hash user's stored hash
 * @returns boolean
 */
const isValidPassword = async (password, hash) => {
  if (typeof password === "string" && typeof hash === "string") {
    const results = await bcryptjs.compare(password, hash);
    return results;
  }
  return false;
};

module.exports = { genPassword, isValidPassword };
