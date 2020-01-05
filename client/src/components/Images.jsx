import React, { useState, useEffect } from "react";

const Images = ({ images }) => {
	console.log(images);
	return (
		<div className="images">
			{images.map(img => (
				<img src={img.imageURL} key={img._id} alt="" />
			))}
		</div>
	);
};

export default Images;
