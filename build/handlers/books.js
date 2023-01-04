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
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../models/book");
const store = new book_1.BookModel();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield store.index();
    res.json(books);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = {
        title: req.body.title,
        author: req.body.author,
        total_pages: req.body.total_pages,
        summary: req.body.summary
    };
    try {
        const result = yield store.create(book);
        res.json(result);
    }
    catch (error) {
        res.json(error);
    }
});
const booksRoutes = (app) => {
    app.get('/books', index);
    app.post('/books', create);
};
exports.default = booksRoutes;
