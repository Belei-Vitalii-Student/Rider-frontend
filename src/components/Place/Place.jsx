import BuildIcon from "@mui/icons-material/Build";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BedIcon from "@mui/icons-material/Bed";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import TrafficIcon from "@mui/icons-material/Traffic";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import "./place.scss";
import { useSelector } from "react-redux";
import { getZoomLevel } from "../../features/map/mapSlice";
import React, { useEffect } from "react";

const placeTypes = {
  workshop: <BuildIcon className="icon" />,
  food: <RestaurantIcon className="icon" />,
  rest: <BedIcon className="icon" />,
  park: <LocalParkingIcon className="icon" />,
  traffic: <TrafficIcon className="icon" />,
};
export default function Place(props) {
  const { $hover, place, text } = props;
  const navigate = useNavigate();

  const zoom = useSelector(getZoomLevel);

  const iconStyles = {
    width: `${zoom * 1.2}px`,
    height: `${zoom * 1.2}px`,
  };

  if (!place) return null;

  return (
    <Link to={`/${place.id}`} className="place-container">
      <ul className="list-types">
        {place.types.map((placeType) => (
          <li className="type-el">
            {React.cloneElement(placeTypes[placeType], { style: iconStyles })}
          </li>
        ))}
      </ul>
    </Link>
  );
}
