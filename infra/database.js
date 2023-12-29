import { Client } from "pg";

export async function query(queryObject) {
  const client = await connect();
  try {
    return await client.query(queryObject);
  } catch (e) {
    console.log(e);
  } finally {
    await client.end();
  }
}

async function connect() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  return client;
}

export default {
  query,
};
