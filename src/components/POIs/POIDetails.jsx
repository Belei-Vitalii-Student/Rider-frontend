import { Link, useNavigate, useParams } from "react-router-dom";
import "./pois.scss";
import CommentsList from "./CommentsList";
import { useDispatch, useSelector } from "react-redux";
import { getMapPOIs, getPOIById } from "../../features/map/mapSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PlaceIcon from "@mui/icons-material/Place";
import RouteIcon from "@mui/icons-material/Route";
import CircularProgress from "@mui/material/CircularProgress";
import CommentForm from "./CommentForm";
import { useQuery } from "@apollo/client";
import { QUERY } from "../../config/graphql/query";
import { useEffect, useState } from "react";
import {
  selectPoiDetailData,
  selectPoiDislikes,
  selectPoiLikes,
  setPoiDetailData,
} from "../../features/poiDetail/poiDetailSlice";
import { selectUserId } from "../../features/login/loginSlice";

export default function POIDetails(props) {
  const { form = true } = props;
  const { id } = useParams();
  if (id === "profile" || id === "edit") return null;
  const likes = useSelector(selectPoiLikes);
  const dislikes = useSelector(selectPoiDislikes);
  const { data, loading, error } = useQuery(QUERY.POI, {
    variables: {
      id: id,
    },
  });
  const [poi, setPoi] = useState({});
  const dispatch = useDispatch();

  const handleButtonClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("Button clicked");
  };

  useEffect(() => {
    if (data) {
      dispatch(setPoiDetailData(data.poi));
      setPoi(data.poi);
    }
  }, [data, loading, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Link to={"/"} sx={{ display: "flex", alignItems: "center" }}>
        GO BACK
      </Link>
      <div className="poi-details">
        <div className="place-el">
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
                <p className="author">{poi?.user?.name}</p>
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
                <span className="count">{likes}</span>
                <ThumbUpIcon className="like-icon" />
              </div>
              <div className="dislikes">
                <span className="count">{dislikes}</span>
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
        </div>
        <div className="comments-block">
          {form && <CommentForm />}
          <h2>COMMENTS</h2>
          <CommentsList />
        </div>
      </div>
    </>
  );
}
