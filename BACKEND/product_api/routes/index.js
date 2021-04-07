var express = require('express');
var router = express.Router();

/* GET home page. */

const { Pool } = require('pg');
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'my_db',
	password: 'nhutuan99',
	port: 5432
});

router.get('/', function (req, res, next) {});

router.get('/getData', function (req, res, next) {
	pool.query('Select * from product_info', (error, response) => {
		if (error) {
			return console.error('Error executing query', error.stack);
		}
		res.send(response.rows);
	});

	router.get('/add', function (req, res, next) {
		res.render('add', {});
	});
	router.post('/add', function (req, res, next) {
		var product_name = req.body.product_name,
			product_price = req.body.product_price,
			product_picture = req.body.product_picture;
		res.send(
			'Send Successfully' + product_name + product_price + product_picture
		);
		pool.query(
			'Insert into product_info (product_name,product_price,product_picture) values($1,$2,$3)',
			[product_name, product_price, product_picture]
		),
			(err, response) => {
				if (err) {
					res.send(err);
					res.send(0);
				} else {
					res.send(1);
				}
			};
	});
});

module.exports = router;
