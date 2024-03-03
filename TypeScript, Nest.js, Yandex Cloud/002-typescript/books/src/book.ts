import booksModel from './models/books'
// TS7016: Нельзя импортировать JS-file

interface Book {
    id: string,
    title: string,
    description: string,
    authors?: string,
    favorite?: string,
    fileCover?: string,
    fileName?: string
}

abstract class BookRepository {
    async createBook(book: Book) {
        try {
            await booksModel.create(book)
        } catch (e) {
            console.log(e)
        }
    }

    async getBook(id: string) {
        try {
            return await booksModel.findById(id).select("__v")
        } catch (e) {
            console.log(e)
        }
    }

    async getBooks() {
        try {
            return await booksModel.find().select('__v')
        } catch (e) {
            console.log(e)
        }
    }

    // В ТЗ нет формата входа данных опций, поэтому сделал на свое усмотрение
    async updateBook(id: string, toUpdate: any[]) {
        try {
            return await booksModel.findByIdAndUpdate(id, toUpdate)
        } catch (e) {
            console.log(e)
        }
    }

    async deleteBook(id: string) {
        try {
            return await booksModel.findByIdAndDelete(id)
        } catch (e) {
            console.log(e)
        }
    }
}