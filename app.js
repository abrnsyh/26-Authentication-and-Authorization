const express = require("express");
const rootRouter = require("./auth");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(rootRouter);

app.listen(PORT, () => {
	console.log("Server run on PORT " + PORT);
});
