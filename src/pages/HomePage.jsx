import Map from "../components/Map/Map";
import "../assets/styles/base.scss";
import POIList from "../components/POIs/POIList";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import POIDetails from "../components/POIs/POIDetails";
import POIForm from "../components/POIs/POIForm";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import { selectUserId } from "../features/login/loginSlice";

export default function HomePage({ props }) {
  const userId = useSelector(selectUserId);
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/profile/*" element={<Profile />} />
        </Routes>
        <Map />
        <Routes>
          <Route path="/" element={<POIList />} />
          <Route
            path="/profile"
            element={<POIList userId={userId} link={"/profile"} />}
          />
          <Route path="/:id" element={<POIDetails />} />
          <Route path="/profile/:id" element={<POIDetails form={false}/>} />
          <Route path="/edit" element={<POIForm />} />
        </Routes>
      </div>
    </>
  );
}
