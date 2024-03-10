import mongoose from 'mongoose';

mongoose.connect(process.env.dbUrl || 'mongodb://localhost:27017/books', { dbName: process.env.dbUrl || 'books' });

mongoose.connection.on('open', () => {
    console.log('Connection to MongoDB is established!');
});