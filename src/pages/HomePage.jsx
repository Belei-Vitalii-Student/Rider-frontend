import Map from "../components/Map/Map";
import "../assets/styles/base.scss";
import POIList from "../components/POIs/POIList";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import POIDetails from "../components/POIs/POIDetails";
import POIForm from "../components/POIs/POIForm";

export default function HomePage({ props }) {
  return (
    <>
      <div className="container">
        <Map />
        <Routes>
          <Route path="/" element={<POIList />} />
          <Route path="/:id" element={<POIDetails />} />
          <Route path="/edit" element={<POIForm />} />
        </Routes>
      </div>
    </>
  );
}
