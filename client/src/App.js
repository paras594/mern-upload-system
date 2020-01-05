import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import Images from "./components/Images";

const App = () => {
	const [name, setName] = useState("");
	const [file, setFile] = useState({});
	const [images, setImages] = useState([]);

	function getImages() {
		Axios.get("http://localhost:5000/images").then(res => {
			setImages(res.data);
		});
	}

	useEffect(() => {
		getImages();
	}, []);

	const handleSubmit = e => {
		e.preventDefault();

		const data = new FormData();

		data.append("name", name);

		data.append("imageURL", file);

		Axios.post("http://localhost:5000/add", data, {
			headers: { "Content-Type": "multipart/form-data" },
		}).then(res => {
			getImages();
		});
	};

	const handleSelectedFile = e => {
		setFile(e.target.files[0]);
	};

	return (
		<>
			<form encType="multipart/form-data" onSubmit={handleSubmit}>
				<label htmlFor="name">Name: </label>
				<input
					type="text"
					name="name"
					onChange={e => setName(e.target.value)}
					value={name}
				/>
				<br />
				<br />
				<label htmlFor="file">File: </label>
				<input type="file" name="file" onChange={handleSelectedFile} />
				<br />
				<br />
				<button type="submit">Submit</button>
			</form>
			<Images images={images} />
		</>
	);
};

export default App;
