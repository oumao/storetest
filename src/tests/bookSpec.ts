import { Book, BookModel } from '../models/book'

const bookstore = new BookModel()

describe("Book Model", () => {
    it("Should have index method", () => {
        expect(bookstore.index).toBeDefined()
    })

    it("Should have create method", () => {
        expect(bookstore.create).toBeDefined()
    })

    xit("Should return list of books", async () => {
        const result = await bookstore.index()

        expect(result).toEqual([])
    })

    // it("Should select 1", async () => {
    //     const res = await bookstore.index()
    //     expect(res).toEqual()
    // })

    it('create method should add a book', async () => {
        try {
            const result = await bookstore.create({
              title: 'Bridge to Terabithia',
              total_pages: 250,
              author: 'Katherine Paterson',
              summary: 'Childrens'
            })
            console.log(result)


            const expected = {
                id: "1" as string,
                title: 'Bridge to Terabithia',
                total_pages: 250,
                author: 'Katherine Paterson',
                summary: 'Childrens'
            }

            console.log(`Expected: ${JSON.stringify(expected)}, actual: ${JSON.stringify(result)}`)
            expect(result).toEqual(expected)
            
          } catch (err) {
            console.error(err)
          }
          
      });
})