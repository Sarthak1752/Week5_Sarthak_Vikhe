"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const credentials_1 = __importDefault(require("../common/credentials"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize({
    username: credentials_1.default.postgres.USERNAME,
    password: credentials_1.default.postgres.PASSWORD,
    database: credentials_1.default.postgres.DATABASE,
    host: credentials_1.default.postgres.HOST,
    port: credentials_1.default.postgres.DBPORT,
    dialect: credentials_1.default.postgres.DIALECT
});
sequelize.authenticate().then(() => {
    console.log("Database is connected");
}).catch((error) => {
    console.log("error occured while connecting to DB", error);
});
sequelize.sync().then(() => {
    console.log("DB is Synchronized");
}).catch((error) => {
    console.log("error while Synchronizing", error);
});
exports.default = sequelize;
//# sourceMappingURL=pgconfig.js.map