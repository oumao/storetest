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
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const pepper = process.env.PEPPER;
class UserStore {
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (username, pass_digest) VALUES($1, $2) RETURNING *';
                const hashed_pass = bcrypt_1.default.hashSync(u.pass_digest + pepper, parseInt(SALT_ROUNDS));
                // console.log(hashed_pass)
                const result = yield conn.query(sql, [u.username, hashed_pass]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Couldnot create user ${u.username}. Error ${err}`);
            }
        });
    }
    authenticate(username, pass_digest) {
        return __awaiter(this, void 0, void 0, function* () {
            try { // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM users where username=($1)`;
                const result = yield conn.query(sql, [username]);
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(pass_digest + pepper, user.pass_digest)) {
                        return user;
                    }
                }
                return null;
            }
            catch (err) {
                throw new Error(`Couldnot find user with username: ${username}. Error ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
