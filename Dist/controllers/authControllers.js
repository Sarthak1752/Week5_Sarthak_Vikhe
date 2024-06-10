"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const employee_1 = __importDefault(require("../models/employee"));
const jwt_1 = require("../utils/jwt");
//REGISTRATION
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, assignedShiftHours, role } = req.body;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const employee = yield employee_1.default.create({
            name,
            email,
            password: hashedPassword,
            assignedShiftHours,
            role,
        });
        res.status(201).json({ message: 'Employee registered successfully', employee });
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering employee', error });
    }
});
exports.register = register;
//LOGIN
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const employee = yield employee_1.default.findOne({ where: { email } });
        if (!employee) {
            return res.status(404).json({ message: 'Employee Not Found' });
        }
        const Match = yield bcryptjs_1.default.compare(password, employee.password);
        if (!Match) {
            return res.status(400).json({ message: 'Incoreect Username or Password' });
        }
        const token = (0, jwt_1.generateToken)(employee);
        res.status(200).json({ message: 'Login Successful', 'Token': token });
    }
    catch (error) {
        res.status(500).json({ message: 'Error while Logging in', error });
    }
});
exports.login = login;
//# sourceMappingURL=authControllers.js.map