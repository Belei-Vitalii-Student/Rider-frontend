import { useState } from "react";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PlaceIcon from "@mui/icons-material/Place";

import RouteIcon from "@mui/icons-material/Route";

export default function POIElement({ poi, link = "" }) {
  const handleButtonClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("Button clicked");
  };

  return (
    <Link
      to={`${link}/${poi.id}`}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <li className="place-el">
        <div className="place-head">
          <div className="main-info">
            {poi.type == "place" ? (
              <PlaceIcon className="type-icon" />
            ) : (
              <RouteIcon className="type-icon" />
            )}
            <div className="adress-block">
              <p className="place-name">{poi.title}</p>
              <p className="place-address">{poi.address}</p>
            </div>
          </div>
          <div className="author-block">
            <div>
              <p className="date">{poi.createdAt}</p>
              <p className="author">{poi.user.name}</p>
            </div>
            <PersonIcon className="author-icon" />
          </div>
        </div>
        <div className="place-content">
          <p className="place-text">{poi.description}</p>
        </div>
        <div className="place-footer">
          <div className="feedback">
            <div className="likes">
              <span className="count">{poi.likes}</span>
              <ThumbUpIcon className="like-icon" />
            </div>
            <div className="dislikes">
              <span className="count">{poi.dislikes}</span>
              <ThumbDownIcon className="dislike-icon" />
            </div>
          </div>
          <div className="reference-btn">
            <button>Another places</button>
          </div>
        </div>
        <MoreVertIcon className="actions-btn" />
        <ul className="actions">
          <li onClick={handleButtonClick}>Видалити</li>
          <li onClick={handleButtonClick}>Поскаржитись</li>
          <li onClick={handleButtonClick}>Змінити</li>
        </ul>
      </li>
    </Link>
  );
}
