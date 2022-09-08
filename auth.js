const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const booksRouter = require("./books");

const users = [
	{
		username: "terra",
		password: "password123admin",
		role: "admin",
	},
	{
		username: "dave",
		password: "password123member",
		role: "member",
	},
];

const accessTokenSecret = "verysecretpass";

router.get("/", (req, res) => {
	res.json("Tes");
});

router.post("/login", (req, res) => {
	const { username, password } = req.body;

	const user = users.find((item) => {
		return item.username === username && item.password === password;
	});

	console.log(user);
	if (user) {
		const accessToken = jwt.sign(
			{
				username: user.username,
				role: user.role,
			},
			accessTokenSecret
		);

		res.json({
			accessToken,
		});
	} else {
		res.send("Username or password incorrect");
	}
});

const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		jwt.verify(authHeader, accessTokenSecret, (error, user) => {
			if (error) {
				return res.sendStatus(401);
			}
			req.user = user;
			next();
		});
	} else {
		res.sendStatus(401);
	}
};

router.use("/books", authenticateJWT, booksRouter);

module.exports = router;
