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
exports.deleteProject = exports.updateComplete = exports.getuserProject = exports.getProject = exports.getProjects = exports.addProject = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const config_1 = require("../Config/config");
const addProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ProjectsId = (0, uuid_1.v4)();
        const { name, description, enddate, email } = req.body;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        yield pool
            .request()
            .input('ProjectsId', mssql_1.default.VarChar, ProjectsId)
            .input('name', mssql_1.default.VarChar, name)
            .input('description', mssql_1.default.VarChar, description)
            .input('enddate', mssql_1.default.VarChar, enddate)
            .input('email', mssql_1.default.VarChar, email)
            .execute('insertProject');
        res.json({ message: 'Project Inserted Successfully' });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.addProject = addProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const projects = yield pool.request().execute('getProjects');
        const { recordset } = projects;
        res.json(recordset);
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getProjects = getProjects;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ProjectsId = req.params.ProjectsId;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const projects = yield pool
            .request()
            .input('ProjectsId', mssql_1.default.VarChar, ProjectsId)
            .execute('getProject');
        const { recordset } = projects;
        if (!projects.recordset[0]) {
            res.json({ message: 'Project Not Found' });
        }
        else {
            res.json(recordset);
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getProject = getProject;
const getuserProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const projects = yield pool
            .request()
            .input('email', mssql_1.default.VarChar, email)
            .execute('getuserProject');
        const { recordset } = projects;
        if (!projects.recordset[0]) {
            res.json({ message: 'Project Not Found' });
        }
        else {
            res.json(recordset);
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getuserProject = getuserProject;
const updateComplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ProjectsId = req.params.ProjectsId;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const projects = yield pool
            .request()
            .input('ProjectsId', mssql_1.default.VarChar, ProjectsId)
            .execute('getProject');
        if (!projects.recordset[0]) {
            res.json({ message: 'Project Not Found' });
        }
        else {
            yield pool.request()
                .input('Project_id', mssql_1.default.VarChar, ProjectsId)
                .execute('updateComplete');
            res.json({ message: 'Project Updated ...' });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.updateComplete = updateComplete;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ProjectsId = req.params.ProjectsId;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const projects = yield pool
            .request()
            .input('ProjectsId', mssql_1.default.VarChar, ProjectsId)
            .execute('getProject');
        if (!projects.recordset[0]) {
            res.json({ message: 'Project Not Found' });
        }
        else {
            yield pool.request()
                .input('ProjectsId', mssql_1.default.VarChar, ProjectsId)
                .execute('deleteProject');
            res.json({ message: 'Project Deleted' });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.deleteProject = deleteProject;
