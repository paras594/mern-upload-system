const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const DIR = "./public/";
const User = require("./models/userSchema.js");

const app = express();

// database connection
require("./db.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR);
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname
			.toLowerCase()
			.split("")
			.join("-");

		cb(null, fileName);
	}
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype == "image/png" ||
			file.mimetype == "image/jpg" ||
			file.mimetype == "image/jpeg" ||
			file.mimetype == "image/gif"
		) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error("Allowed only .png, .jpg, .jpeg and .gif"));
		}
	}
});

app.get("/", (req, res) => {
	res.json({
		message: "working"
	});
});

app.post("/add", upload.single("imageURL"), (req, res, next) => {
	console.log(req.file);
	const user = new User({
		name: req.body.name,
		imageURL: req.file.path
	});

	user.save().then(result => {
		res.status(201).json({
			message: "User registered successfully!"
		});
	});
});

app.listen(5000, () => console.log("listening on port 3000"));
