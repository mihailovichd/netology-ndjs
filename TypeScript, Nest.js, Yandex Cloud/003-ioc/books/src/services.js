"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRepository = void 0;
var books_1 = __importDefault(require("./models/books"));
require("reflect-metadata");
var inversify_1 = require("inversify");
var BooksRepository = exports.BooksRepository = /** @class */ (function () {
    function BooksRepository() {
    }
    BooksRepository.prototype.createBook = function (book) {
        return books_1.default.create(book);
    };
    BooksRepository.prototype.getBook = function (id) {
        return books_1.default.findById(id).select('-__v');
    };
    BooksRepository.prototype.getBooks = function () {
        return books_1.default.find().select('-__v');
    };
    BooksRepository.prototype.updateBook = function (id, toUpdate) {
        return books_1.default.findByIdAndUpdate(id, toUpdate);
    };
    BooksRepository.prototype.deleteBook = function (id) {
        return books_1.default.findByIdAndDelete(id);
    };
    BooksRepository = __decorate([
        (0, inversify_1.injectable)()
    ], BooksRepository);
    return BooksRepository;
}());
