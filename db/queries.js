const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages ORDER BY id DESC");
  return rows;
}

async function insertUsername(messageuser, messagetext, added) {
  await pool.query(
    "INSERT INTO messages (messageuser, messagetext, added) VALUES ($1, $2, $3)",
    [messageuser, messagetext, added],
  );
}

module.exports = {
  getAllMessages,
  insertUsername,
};
