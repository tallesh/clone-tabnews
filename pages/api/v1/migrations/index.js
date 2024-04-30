import migrationsRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const defaultMigrationOptions = {
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const migrations = await migrationsRunner(defaultMigrationOptions);
    return response.status(200).json(migrations);
  }

  if (request.method === "POST") {
    const migrations = await migrationsRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    return response.status(200).json(migrations);
  }

  return response.status(405).send();
}
