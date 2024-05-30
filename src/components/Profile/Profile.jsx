import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import RouteIcon from "@mui/icons-material/Route";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

import "./profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY } from "../../config/graphql/query";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoginData,
  selectUserId,
  setLoginData,
} from "../../features/login/loginSlice";
import { getMapPOIs, setMapPOIs } from "../../features/map/mapSlice";
import { MUTATION } from "../../config/graphql/mutation";
import { toast } from "react-toastify";

const poiTypes = {
  place: <PlaceIcon className="icon" />,
  path: <RouteIcon className="icon" />,
};

export default function Profile(props) {
  const [username, setUsername] = useState("username");
  const [fullname, setFullname] = useState("fullname");
  const [usernameChange, setUsernameChange] = useState(false);
  const [fullnameChange, setFullnameChange] = useState(false);
  const [user, setUser] = useState(null);
  const pois = useSelector(getMapPOIs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector(selectUserId);

  const { data, loading, error } = useQuery(QUERY.USER, {
    variables: {
      id: userId,
    },
    skip: !userId,
  });

  const [changeUsername, { usernameData, usernameLoading, usernameError }] =
    useMutation(MUTATION.CHANGE_USERNAME);

  const [changeName, { nameData, nameLoading, nameError }] = useMutation(
    MUTATION.CHANGE_NAME
  );
  useEffect(() => {
    if (data) {
      const fetcherUser = data.user;
      setUsername(fetcherUser.username);
      setFullname(fetcherUser.name);
      setUser(fetcherUser);
    }
  }, [data]);

  const changeUsernameHandler = (e) => {
    if (username.length <= 6) {
      toast.warn("Username must be at least 6 characters");
      return;
    }

    changeUsername({
      variables: {
        id: userId,
        username: username,
      },
    })
      .then((response) => {
        if (response.data.changeUserUsername) {
          toast.success("Username changed successfully");
          setUsername(username);
          setUsernameChange(false);
        } else {
          toast.error(response.data.changeUsername.message);
        }
      })
      .catch((err) => {
        toast.error("Error changing username");
        console.error(err);
      });
  };

  const changeFullnameHandler = (e) => {
    if (fullname.length < 2) {
      toast.warn("Fullname must be at least 2 characters");
      return;
    }

    changeName({
      variables: {
        id: userId,
        name: fullname,
      },
    })
      .then((response) => {
        if (response.data.changeUserName) {
          toast.success("Name changed successfully");
          setFullname(fullname);
          setFullnameChange(false);
        } else {
          toast.error(response.data.changeUserName.message);
        }
      })
      .catch((err) => {
        toast.error("Error changing name");
        console.error(err);
      });
  };
  const logoutHandler = (e) => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("accessToken");
    dispatch(setLoginData(null));
    dispatch(setMapPOIs([]));
    navigate("/");
  };

  if (error) return <p>Error</p>;
  if (loading || !user) return <p>Loading...</p>;

  return (
    <div className="profile-block">
      <div className="info-block">
        <div className="personal-friends-block">
          <div className="personal-block">
            <span className="title personal">PERSONAL</span>
            <div className="user-fields">
              <div className="username">
                <div className="label">
                  <span>Username</span>
                  {usernameChange ? (
                    <div className="edit-menu">
                      <CloseIcon
                        className="change-icon edit"
                        onClick={(e) => {
                          setUsername(user.username);
                          setUsernameChange(false);
                        }}
                      />
                      <CheckIcon
                        className="change-icon edit"
                        onClick={changeUsernameHandler}
                      />
                    </div>
                  ) : (
                    <EditIcon
                      onClick={(e) => setUsernameChange(true)}
                      className="change-icon"
                    />
                  )}
                </div>
                <input
                  disabled={!usernameChange}
                  type="text"
                  className="field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="fullname">
                <div className="label">
                  <span>Full name</span>
                  {fullnameChange ? (
                    <div className="edit-menu">
                      <CloseIcon
                        className="change-icon edit"
                        onClick={(e) => {
                          setFullname(user.name);
                          setFullnameChange(false);
                        }}
                      />
                      <CheckIcon
                        className="change-icon edit"
                        onClick={changeFullnameHandler}
                      />
                    </div>
                  ) : (
                    <EditIcon
                      onClick={(e) => setFullnameChange(true)}
                      className="change-icon"
                    />
                  )}
                </div>
                <input
                  type="text"
                  className="field"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className="email">
                <div className="label">
                  <span>Email</span>
                </div>
                <input
                  disabled
                  type="text"
                  className="field"
                  value={user.email}
                />
              </div>
              <div className="google-connection">
                <div className="label">
                  <span>Google connection</span>
                </div>
                <input
                  disabled
                  type="text"
                  className="field"
                  value={user.email}
                />
              </div>
            </div>
            <div className="user-stats">
              <div className="places-stat">
                <div className="icon"></div>
                <span className="count"></span>
              </div>
              <div className="paths-stat">
                <div className="icon"></div>
                <span className="count"></span>
              </div>
              <div className="comments-stat">
                <div className="icon"></div>
                <span className="count"></span>
              </div>
              <div className="ride-stat">
                <div className="icon"></div>
                <span className="count"></span>
              </div>
            </div>
          </div>
          <div className="friends-block">
            <span className="title friends">FRIENDS</span>
            <ul className="friend-list">
              {user.friends.length < 1 ? (
                <div>NO FRIENDS YET</div>
              ) : (
                user.friends.map((friend) => {
                  return (
                    <li className="friend-el" key={friend.id}>
                      {friend.picture ? (
                        <img src={friend.picture} className="logo" />
                      ) : (
                        <PersonIcon className="logo" />
                      )}
                      <div className="info">
                        <span className="fullname">{friend.name}</span>
                        <span className="username">{friend.username}</span>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
        <div className="user-options-block">
          <div className="info">
            <span className="fullname">{fullname}</span>
            <span className="username">{username}</span>
          </div>
          <div className="options">
            <ul className="option-list">
              <li className="option-el">
                <span>Mobile app</span>
              </li>
              <li className="option-el">
                <span>Help</span>
              </li>
              <li className="option-el danger">
                <span onClick={logoutHandler}>Log out</span>
              </li>
              <li className="option-el danger">
                <span>Delete account</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="changes-block">
        <span className="title changes">CHANGES</span>
        <ul className="change-list">
          {pois.map((poi) => {
            return (
              <Link key={poi.id} to={`/profile/${poi.id}`} className="link">
                <li className="change-el">
                  {poiTypes[poi.type]}
                  <div className="info">
                    <span className="poi-title">{poi.title}</span>
                    <span className="address">{poi.address}</span>
                  </div>
                  <div className="feedback">
                    <div>
                      <span>{poi.likes}</span>
                      <ThumbUpIcon className="icon" />
                    </div>
                    <div>
                      <span>{poi.dislikes}</span>
                      <ThumbDownIcon className="icon" />
                    </div>
                    <div>
                      <span>{poi.feedbacks.length}</span>
                      <QuestionAnswerIcon className="icon" />
                    </div>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
