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
const ejs_1 = __importDefault(require("ejs"));
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("../Config/config");
dotenv_1.default.config();
const Email_1 = __importDefault(require("../Helpers/Email"));
const SendEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(config_1.sqlConfig);
    const tasks = yield (yield pool.request().query(`
SELECT * FROM UsersTable WHERE issent='0'`)).recordset;
    for (let task of tasks) {
        ejs_1.default.renderFile('template/welcome.ejs', { username: task.username }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            let messageoption = {
                from: process.env.EMAIL,
                to: task.email,
                subject: "Welcome to our website",
                html: data,
                attachments: [
                    {
                        filename: 'task.txt',
                    }
                ]
            };
            try {
                yield (0, Email_1.default)(messageoption);
                yield pool.request().query(`UPDATE UsersTable SET issent='1' WHERE UsersId = '${task.UsersId}'`);
                console.log('Email is Sent');
                console.log(task.UsersId);
            }
            catch (error) {
                console.log(error);
            }
        }));
        console.log(task);
    }
});
exports.default = SendEmails;
