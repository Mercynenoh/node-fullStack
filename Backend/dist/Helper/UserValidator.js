"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchemas = exports.UserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().min(8).alphanum().required()
});
exports.UserSchemas = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().min(8).alphanum().required()
});
