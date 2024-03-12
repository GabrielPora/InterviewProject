"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Pool = require("pg").Pool;
exports.myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "myuser",
    password: "mypassword",
    database: "mydb",
    entities: ["src/entity/*.js"],
    logging: true,
    synchronize: true,
});
// // Create a PostgreSQL connection pool
// export const pool = new Pool({
//   user: "myuser",
//   host: "localhost",
//   database: "mydb",
//   password: "mypassword",
//   port: 5432,
//   entities: ["src/entity/*.js"],
//   logging: true,
//   synchronize: true,
// });
