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
const bookstore = new book_1.BookModel();
describe("Book Model", () => {
    it("Should have index method", () => {
        expect(bookstore.index).toBeDefined();
    });
    it("Should have create method", () => {
        expect(bookstore.create).toBeDefined();
    });
    xit("Should return list of books", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield bookstore.index();
        expect(result).toEqual([]);
    }));
    // it("Should select 1", async () => {
    //     const res = await bookstore.index()
    //     expect(res).toEqual()
    // })
    it('create method should add a book', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield bookstore.create({
                title: 'Bridge to Terabithia',
                total_pages: 250,
                author: 'Katherine Paterson',
                summary: 'Childrens'
            });
            console.log(result);
            const expected = {
                id: "1",
                title: 'Bridge to Terabithia',
                total_pages: 250,
                author: 'Katherine Paterson',
                summary: 'Childrens'
            };
            console.log(`Expected: ${JSON.stringify(expected)}, actual: ${JSON.stringify(result)}`);
            expect(result).toEqual(expected);
        }
        catch (err) {
            console.error(err);
        }
    }));
});
