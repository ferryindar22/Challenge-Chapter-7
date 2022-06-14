const jwt = require("jsonwebtoken");
const rahasia = "qwertyasdf";

function generateToken(player) {
  const payload = {
    id: player.id,
    username: player.username,
  };

  const token = jwt.sign(payload, rahasia);
  return token;
}

module.exports = { generateToken };
