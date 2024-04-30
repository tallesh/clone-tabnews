import migrationsRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  const defaultMigrationOptions = {
    dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const migrations = await migrationsRunner(defaultMigrationOptions);
    await dbClient.end();
    return response.status(200).json(migrations);
  }

  if (request.method === "POST") {
    const migrations = await migrationsRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    await dbClient.end();
    return response.status(200).json(migrations);
  }

  return response.status(405).send();
}
