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
exports.BookModel = void 0;
const database_1 = __importDefault(require("../database"));
class BookModel {
    // async index(): Promise<void> {
    //     try {
    //         const conn = await client.connect()
    //         const result = await conn.query('SELECT 1')
    //         console.log(result.rows) // should print [{ "1": 1 }]
    //     } catch (err) {
    //         console.error(`Error connecting to the database: ${err}`)
    //     }
    // }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM book`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not retrieve books. Error ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM book where id=($1)`;
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not retrieve book with id ${id}. Error ${err}`);
            }
        });
    }
    create(b) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO book (title, author, total_pages, summary) 
                        VALUES($1, $2, $3, $4) RETURNING *`;
                const result = yield conn.query(sql, [b.title, b.author, b.total_pages, b.summary]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not create book ${b.title}. Error: ${err}`);
            }
        });
    }
}
exports.BookModel = BookModel;
