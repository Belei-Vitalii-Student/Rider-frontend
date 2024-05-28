import BuildIcon from "@mui/icons-material/Build";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BedIcon from "@mui/icons-material/Bed";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import TrafficIcon from "@mui/icons-material/Traffic";
import { useSelector } from "react-redux";
import { isEditMode } from "../../features/map/mapSlice";

export default function LeftPanel({ props }) {
  const editMode = useSelector(isEditMode);
  return (
    <div className="left-panel">
      {editMode ? (
        <div className="type-select-block"></div>
      ) : (
        <>
          <ul className="places-option-list">
            <li className="place-option-el">
              <p>Workshop</p>
              <BuildIcon />
            </li>
            <li className="place-option-el">
              <p>Food</p>
              <RestaurantIcon />
            </li>
            <li className="place-option-el">
              <p>Rest</p>
              <BedIcon />
            </li>
            <li className="place-option-el">
              <p>Parking</p>
              <LocalParkingIcon />
            </li>
            <li className="place-option-el">
              <p>Traffic light</p>
              <TrafficIcon />
            </li>
          </ul>
          <ul className="road-type-list">
            <li className="road-type-el">
              <img src="http://place"></img>
            </li>
            <li className="road-type-el">
              <img src="http://place"></img>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
