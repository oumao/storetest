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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_1 = require("../models/user");
const store = new user_1.UserStore();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userObject = {
        username: req.body.username,
        pass_digest: req.body.pass_digest
    };
    try {
        const user = yield store.create(userObject);
        const token = jsonwebtoken_1.default.sign({ user: user }, process.env.SECRET);
        res.json({ token: token });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, pass_digest } = req.body;
    try {
        const user = yield store.authenticate(username, pass_digest);
        const token = jsonwebtoken_1.default.sign({ user: user }, process.env.SECRET);
        res.json({ token: token });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const userRoutes = (app) => {
    app.post('/users', create);
    app.post('/users/:username', authenticate);
};
exports.default = userRoutes;
