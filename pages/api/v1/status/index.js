import { version, maxConnections, activeConnections } from "infra/queries";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dataBaseStatus = {
    version: await version(),
    max_connections: await maxConnections(),
    used_connections: await activeConnections(),
  };

  response.status(200).json({
    updated_at: updatedAt,
    database: dataBaseStatus,
  });
}

export default status;
