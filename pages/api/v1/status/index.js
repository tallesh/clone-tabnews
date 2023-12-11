import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dataBaseStatus = await database.status();

  response.status(200).json({
    updated_at: updatedAt,
    database: dataBaseStatus,
  });
}

export default status;
