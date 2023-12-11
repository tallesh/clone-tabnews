import { Client } from "pg";
import {
  VERSION_QUERY,
  MAX_CONNECTIONS_QUERY,
  ACTIVE_CONNECTIONS_QUERY,
} from "./queries";

async function query(queryObject) {
  const client = await connect();
  const result = await client.query(queryObject);
  await client.end();
  return result;
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

async function status() {
  const client = await connect();
  const versionResult = await client.query(VERSION_QUERY);
  const maxConnectionResult = await client.query(MAX_CONNECTIONS_QUERY);
  const activeConnectionResult = await client.query(ACTIVE_CONNECTIONS_QUERY);
  await client.end();

  return {
    version: versionResult.rows[0].server_version,
    max_connections: maxConnectionResult.rows[0].max_connections,
    used_connections: activeConnectionResult.rows[0].count,
  };
}

export default {
  query,
  status,
};
