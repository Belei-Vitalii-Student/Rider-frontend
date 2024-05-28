import { useSelector } from "react-redux";
import {
  selectLoginName,
  selectLoginPicture,
} from "../../features/login/loginSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./user.scss";

export default function UserButton({ props }) {
  const username = useSelector(selectLoginName);
  const picture = useSelector(selectLoginPicture);

  return (
    <div className="user-button">
      <ExpandMoreIcon className="expand" />
      <span className="name">{username}</span>
      <img src={picture} className="picture" />
    </div>
  );
}
