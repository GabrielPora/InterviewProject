import { query } from "express";
import { DataSource, Logger } from "typeorm";
const { Pool } = require("pg");

export const dataSource = new DataSource({
  type: "postgres",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: ["src/entity/*.js"],
  logging: true,
  synchronize: true,
  migrations: [],
  subscribers: [],
});

const logAll = {
  logQuery: (query, parameters) => {
    console.log("QUERY: ", query);
    console.log("PARAMETERS: ", parameters);
  },
  logQueryError: (error, query, parameters) => {
    console.log("ERROR: ", error);
    console.log("QUERY: ", query);
    console.log("PARAMETERS: ", parameters);
  },
  logQuerySlow: (time, query, parameters) => {
    console.log("SLOW QUERY: ", time);
    console.log("QUERY: ", query);
    console.log("PARAMETERS: ", parameters);
  },
  logSchemaBuild: (message) => {
    console.log("SCHEMA: ", message);
  },
  logMigration: (message) => {
    console.log("MIGRATION: ", message);
  },
  log: (level, message) => {
    console.log("LOG: ", level);
    console.log("MIGRATION: ", message);
  },
};

const logNothing: Logger = {
  logQuery: (query, parameters) => {},
  logQueryError: (error, query, parameters) => {},
  logQuerySlow: (time, query, parameters) => {},
  logSchemaBuild: (message) => {},
  logMigration: (message) => {},
  log: (level, message) => {},
};

export const getDs = (logging = false) => {
  dataSource.logger = logging ? logAll : logNothing;
  return dataSource;
};
