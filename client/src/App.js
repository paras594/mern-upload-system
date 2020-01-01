import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";

const App = () => {
	const [name, setName] = useState("");
	const [file, setFile] = useState({});
	const handleSubmit = e => {
		e.preventDefault();

		const data = new FormData();

		data.append("name", name);

		data.append("imageURL", file);

		Axios.post("http://localhost:5000/add", data, {
			headers: { "Content-Type": "multipart/form-data" },
		}).then(res => {
			console.log(res.data);
		});
	};

	const handleSelectedFile = e => {
		setFile(e.target.files[0]);
	};

	return (
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
	);
};

export default App;
