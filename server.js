const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sdffsA47xfhyq!', // Якщо у вас є пароль, вкажіть його тут
    database: 'bookstore'
});

db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        process.exit(1); // Завершити процес з помилкою
    }
    console.log('MySQL Connected...');
});

// Маршрути для книг
app.get('/books', (req, res) => {
    let sql = 'SELECT * FROM books';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
        } else {
            res.send(result);
        }
    });
});

// Маршрут для отримання однієї книги за ID
app.get('/book/:id', (req, res) => {
    let sql = `SELECT * FROM books WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
        } else {
            res.send(result);
        }
    });
});

// Маршрут для додавання книги
app.post('/book', (req, res) => {
    let book = req.body;
    let sql = 'INSERT INTO books SET ?';
    db.query(sql, book, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
        } else {
            res.send('Book added');
        }
    });
});

// Маршрут для оформлення замовлення
app.post('/order', (req, res) => {
    let order = { user_id: req.body.user_id, order_date: new Date(), status: 'Pending' };
    let sql = 'INSERT INTO orders SET ?';
    db.query(sql, order, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
        } else {
            let orderId = result.insertId;
            let orderItems = req.body.items.map(item => [orderId, item.book_id, item.quantity]);
            let sqlItems = 'INSERT INTO order_items (order_id, book_id, quantity) VALUES ?';
            db.query(sqlItems, [orderItems], (err, result) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).send('Server error');
                } else {
                    res.send('Order created');
                }
            });
        }
    });
});

// Маршрут для додавання рецензії
app.post('/review', (req, res) => {
    let review = req.body;
    let sql = 'INSERT INTO reviews SET ?';
    db.query(sql, review, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
        } else {
            res.send('Review added');
        }
    });
});

const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Маршрут для отримання книг за жанром
app.get('/books/genre/:genre', (req, res) => {
    let genre = req.params.genre;
    let sql = `SELECT * FROM books WHERE genre = '${genre}'`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
        } else {
            res.send(result);
        }
    });
});
