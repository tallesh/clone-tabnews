import database from "infra/database";
import Orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await Orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("POST to api/v1/migrations should return status code 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);

  const responseBody = await response.json();
  expect(responseBody.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);

  const responseBody2 = await response2.json();
  expect(responseBody2.length).toBe(0);
});
