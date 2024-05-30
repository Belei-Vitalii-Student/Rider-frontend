import { useSelector } from "react-redux";
import {
  selectLoginName,
  selectLoginPicture,
} from "../../features/login/loginSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./user.scss";
import { Link } from "react-router-dom";

export default function UserButton({ props }) {
  const username = useSelector(selectLoginName);
  const picture = useSelector(selectLoginPicture);

  return (
    <Link to={"/profile"}>
      <div className="user-button">
        <ExpandMoreIcon className="expand" />
        <span className="name">{username}</span>
        <img src={picture} className="picture" />
      </div>
    </Link>
  );
}
