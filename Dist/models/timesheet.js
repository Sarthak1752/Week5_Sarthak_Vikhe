"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgconfig_1 = __importDefault(require("../postgres/pgconfig"));
const employee_1 = __importDefault(require("./employee"));
const shift_1 = __importDefault(require("./shift"));
class Timesheet extends sequelize_1.Model {
}
Timesheet.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    employeeId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: employee_1.default,
            key: 'id',
        },
        allowNull: false,
    },
    shiftId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: shift_1.default,
            key: 'id',
        },
        allowNull: false,
    },
    projectName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    taskName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fromDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    toDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: pgconfig_1.default,
    modelName: 'Timesheet',
});
exports.default = Timesheet;
//# sourceMappingURL=timesheet.js.map