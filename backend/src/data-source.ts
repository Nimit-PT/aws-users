import "reflect-metadata";
import { DataSource } from "typeorm";

import dotenv from "dotenv";
dotenv.config();

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE } = process.env;
console.log("🚀 ~ POSTGRES_PASSWORD:", POSTGRES_PASSWORD);
console.log("🚀 ~ POSTGRES_USER:", POSTGRES_USER);
console.log("🚀 ~ POSTGRES_PORT:", POSTGRES_PORT);
console.log("🚀 ~ POSTGRES_HOST:", POSTGRES_HOST);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT || "5432"),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  entities: ["./src/entities/**/*{.ts,.js}"],
  synchronize: false,
  migrations: ["./src/migrations/*{.ts,.js}"],
  logging: ["query", "error"],
});
