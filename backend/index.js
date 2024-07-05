const express = require('express');
const router = require('./Routes');
const app = express();
const PORT = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const corsOptions = { 
    origin : ['http://localhost:5500'], 
} 

app.use(bodyParser.json());
app.use(cors(corsOptions))
app.use("/api/vi",router);


app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
