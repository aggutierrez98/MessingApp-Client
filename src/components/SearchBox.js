import React from "react";
import { useSelector } from "react-redux";
import defaultImage from "../assets/default-user-image.jpg";
import { Selectores } from "./Selectores";

export const SearchBox = () => {
	const { name, imagen } = useSelector((state) => state.usuario);

	return (
		<>
			<div className="user-profile">
				<div className="info-user">
					<div className="info-user-img">
						{imagen ? (
							<img className="info-user-img_img" src={imagen} alt="sunil" />
						) : (
							<img
								className="info-user-img_img"
								src={defaultImage}
								alt="sunil"
							/>
						)}
					</div>
					<div className="info-user-name">
						<p>{name}</p>
					</div>
				</div>

				<Selectores />
			</div>
		</>
	);
};
