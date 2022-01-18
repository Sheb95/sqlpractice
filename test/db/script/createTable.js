import query from "../index.js";

const sqlString = `CREATE TABLE IF NOT EXISTS naturalHairstyles (id SERIAL PRIMARY KEY, hairstyle TEXT, image TEXT, difficulty TEXT,  url TEXT)`;

async function createTable() {
  const response = await query(sqlString);
  console.log("Created a table", response);
}

createTable();
