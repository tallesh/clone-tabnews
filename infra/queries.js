import { dbName } from "./constants";
import { query } from "./database";

export async function version() {
  const VERSION_QUERY = "SHOW server_version";
  const result = await query(VERSION_QUERY);
  return result.rows[0].server_version;
}

export async function maxConnections() {
  const MAX_CONNECTIONS_QUERY = "SHOW max_connections";
  const result = await query(MAX_CONNECTIONS_QUERY);
  return result.rows[0].max_connections;
}

export async function activeConnections() {
  const ACTIVE_CONNECTIONS_QUERY =
    "SELECT count(*)::int FROM pg_stat_activity where datname = $1;";
  const result = await query({
    text: ACTIVE_CONNECTIONS_QUERY,
    values: [dbName],
  });
  return result.rows[0].count;
}
