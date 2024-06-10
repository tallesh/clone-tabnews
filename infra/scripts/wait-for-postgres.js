const { exec } = require("node:child_process");

function checkPostgres() {
  exec(
    "docker exec postgres-dev pg_isready --host localhost",
    waitUntilPostgresIsReady,
  );
}

function waitUntilPostgresIsReady(error, stdout, stderr) {
  if (!stdout.includes("accepting connections")) {
    // setTimeout(checkPostgres, 1000);
    process.stdout.write(".");
    checkPostgres();
    return;
  }

  console.log("\n🟢 Postgres está pronto e aceitando conexões!\n");
}

process.stdout.write("\n\n🔴 Aguardando Postgres aceitar conexões");
checkPostgres();
