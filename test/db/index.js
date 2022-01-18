import pg from "pg";
import "dotenv/config";
import { databaseHost, databaseName, password, username } from "../config.js";

const pool = new pg.Pool({
  user: username,
  host: databaseHost,
  database: databaseName,
  password: password,
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

export default function query(text, params) {
  return pool.query(text, params);
}
