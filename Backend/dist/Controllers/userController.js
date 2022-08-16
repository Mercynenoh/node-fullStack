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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.getHomepage = exports.getadmin = exports.getUsers = exports.loginUser = exports.addUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_1 = require("../Config/config");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserValidator_1 = require("../Helper/UserValidator");
const UserValidator_2 = require("../Helper/UserValidator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const UsersId = (0, uuid_1.v4)();
        const { username, email, password } = req.body;
        const { error, value } = UserValidator_1.UserSchema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        const hashedpassword = yield bcrypt_1.default.hash(password, 10);
        yield pool.request()
            .input('UsersId', mssql_1.default.VarChar, UsersId)
            .input('username', mssql_1.default.VarChar, username)
            .input('email', mssql_1.default.VarChar, email)
            .input('password', mssql_1.default.VarChar, hashedpassword)
            .execute('addUser');
        res.json({ message: 'Registered...' });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.addUser = addUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const { error, value } = UserValidator_2.UserSchemas.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        const usersResult = yield (yield pool.request()
            .input('email', mssql_1.default.VarChar, email)
            .execute('getUser')).recordset;
        const user = usersResult[0];
        if (!user) {
            return res.json({ message: 'User Not Found' });
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.json({ message: 'Invalid password' });
        }
        const { password: _ } = user, rest = __rest(user, ["password"]);
        console.log(user);
        const token = jsonwebtoken_1.default.sign(rest, process.env.KEY, { expiresIn: '3600s' });
        res.json({
            message: 'Logged in',
            user: rest,
            token
        });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const users = yield pool.request().execute('getUsers');
        const { recordset } = users;
        res.json(recordset);
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getUsers = getUsers;
const getadmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const users = yield pool.request().execute('getadmin');
        const { recordset } = users;
        res.json(recordset);
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getadmin = getadmin;
const getHomepage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        return res.json({ message: `Welcome to the Homepage ${req.info.email}` });
    }
});
exports.getHomepage = getHomepage;
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        res.json({ name: req.info.username, role: req.info.role });
    }
});
exports.checkUser = checkUser;
