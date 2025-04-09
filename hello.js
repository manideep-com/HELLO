const express = require('express');
const path = require('path');

const {open} = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, 'goodread.db');

let db = null;

const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
            });
            app.listen(3000, () => {
                console.log("Server Running at http://localhost:3000/");
                });
                } catch (e) {
                    console.log(`DB Error: ${e.message}`);
                    process.exit(1);
                    }
                    };
                    initializeDBAndServer();

                    //get book api
                    app.get('/books/', async (req, res) => {
                        const getBooksQuery = 
                        `SELECT 
                        * FROM 
                        book
                        ORDER BY
                        book_id; `;
                        const books = await db.all(getBooksQuery);
                        res.send(booksarray);
                        });
                        //get book by id api
                        app.get('/books/:bookid', async (req, res) => {
                            const { bookid } = req .params;
                            const getBookQuery = `SELECT * FROM book WHERE book_id = ${bookid};`;
                            const book = await db.get(getBookQuery);
                            res.send(book);
                            });
                            //add book api
                            app.post('/books/', async (req, res) => {
                                const bookdetails = req.body;
                                const { title, author, rating } = bookdetails;
                                const addBookQuery = `INSERT INTO book (title, author, rating) VALUES 
                                (${title}, ${author},${rating});`;
                                 const dbres = await db.run(addBookQuery);
                                 const bookid = dbres.lastid;
                                 res.send({bookid :  bookid });
                                 });
                                 //update book api
                                 app.put('/books/:bookid', async (req, res) => {
                                    const { bookid } = req.params;
                                    const bookdetails = req.body;
                                    const { title, author, rating } = bookdetails;
                                    const updateBookQuery = `UPDATE book SET title = ${title}, author = ${author},
                                    rating = ${rating} WHERE book_id = ${bookid};`;
                                    const dbres = await db.run(updateBookQuery);
                                    res.send({ message: "Book Updated Successfully" });
                                    });
                                    //delete book api   
                                    app.delete('/books/:bookid', async (req, res) => {
                                        const { bookid } = req.params;
                                        const deleteBookQuery = `DELETE FROM book WHERE book_id = ${bookid};`;
                                        const dbres = await db.run(deleteBookQuery);
                                        res.send({ message: "Book Deleted Successfully" });
                                        });
                                        //get author book
                                        app.get('/books/author/:author', async (req, res) => {
                                        const getAuthorBookQuery = `SELECT * FROM book WHERE author = ${author};`;
                                        const authorBook = await db.all(getAuthorBookQuery);
                                        res.send(authorBook);
                                        });