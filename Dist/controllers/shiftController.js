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
exports.endShift = exports.startShift = void 0;
const shift_1 = __importDefault(require("../models/shift"));
const startShift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: employeeId } = req.user;
    try {
        const shift = yield shift_1.default.create({
            employeeId,
            startTime: new Date(),
        });
        res.status(201).json({ message: 'Shift Started', shift });
    }
    catch (error) {
        res.status(500).json({ message: 'Error starting shift', error });
    }
});
exports.startShift = startShift;
const endShift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: employeeId } = req.user;
    try {
        const shift = yield shift_1.default.findOne({
            where: { employeeId, endTime: null },
        });
        if (!shift) {
            return res.status(404).json({ message: 'Shift Not Found' });
        }
        shift.endTime = new Date();
        shift.actualHours = (shift.endTime.getTime() - shift.startTime.getTime()) / 3600000;
        yield shift.save();
        res.status(200).json({ message: 'Shift Ended', shift });
    }
    catch (error) {
        res.status(500).json({ message: 'Error ending the shift', error });
    }
});
exports.endShift = endShift;
//# sourceMappingURL=shiftController.js.map