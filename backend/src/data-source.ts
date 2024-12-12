import "reflect-metadata";
import { DataSource } from "typeorm";

import dotenv from "dotenv";
dotenv.config();

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT || "5432"),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  entities: [process.env.NODE_ENV === "production" ? "./dist/entities/**/*{.js,.ts}" : "./src/entities/**/*{.ts,.js}"],
  migrations: [process.env.NODE_ENV === "production" ? "./dist/migrations/*{.js,.ts}" : "./src/migrations/*{.ts,.js}"],
  synchronize: false,
  logging: ["query", "error"],
});
