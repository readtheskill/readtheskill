import { readFileSync } from "fs";
import { join } from "path";
import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:skill@localhost:5432/skill";

async function migrate() {
  const pool = new Pool({ connectionString: DATABASE_URL });

  try {
    const schema = readFileSync(join(__dirname, "schema.sql"), "utf-8");
    await pool.query(schema);
    console.log("Migration complete");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
