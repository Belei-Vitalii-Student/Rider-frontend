import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import "./logo.scss";
import { Link, useNavigate } from "react-router-dom";

export default function Logo({ props }) {
  return (
    <Link to={"/"}>
      <DirectionsBikeIcon className="logo" />
    </Link>
  );
}
