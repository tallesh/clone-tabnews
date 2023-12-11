export const VERSION_QUERY = "SHOW server_version";
export const MAX_CONNECTIONS_QUERY = "SHOW max_connections";
export const ACTIVE_CONNECTIONS_QUERY =
  "SELECT count(*) FROM pg_stat_activity;";
