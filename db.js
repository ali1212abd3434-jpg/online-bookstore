const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql.railway.internal",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "railway",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
  } else {
    console.log("Connected to MySQL database:", connection.config.database);
    connection.release();
  }
});

module.exports = pool;
