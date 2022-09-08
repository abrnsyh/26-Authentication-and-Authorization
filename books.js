const express = require("express");
const router = express.Router();

const books = [
	{
		author: "Robert Martin",
		country: "USA",
		language: "English",
		pages: 209,
		title: "Clean Code",
		year: 2008,
	},
	{
		author: "Dave Thomas & Andy Hunt",
		country: "USA",
		language: "English",
		pages: 784,
		title: "The Pragmatic Programmer",
		year: 1999,
	},
	{
		author: "Kathy Sierra, Bert Bates",
		country: "USA",
		language: "English",
		pages: 928,
		title: "Head First Java",
		year: 2003,
	},
];

router.get("/", (req, res) => {
	res.json(books);
});

router.post("/", (req, res) => {
	const { role } = req.user;
	const book = req.body;
	if (role === "admin") {
		books.push(book);
		res.json(books);
	} else {
		res.send("Anda bukan admin");
	}
});

module.exports = router;
