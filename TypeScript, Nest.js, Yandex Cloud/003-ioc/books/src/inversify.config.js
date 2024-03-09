"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
var services_1 = require("./services");
var inversify_1 = require("inversify");
var container = new inversify_1.Container;
exports.container = container;
container.bind(services_1.BooksRepository).toSelf();
