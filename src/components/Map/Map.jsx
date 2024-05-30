import React, { useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import GoogleMap from "google-map-react";
import map from "../../config/map";
import Place from "../Place/Place";
import { useEffect, useState } from "react";
import "./map.scss";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewPath,
  getPOIPaths,
  getPOIPlaces,
  isEditMode,
  setNewPath,
  setZoomLevel,
} from "../../features/map/mapSlice";
import { useNavigate } from "react-router-dom";
import { COLOR } from "../../assets/styles/colors";
import { Polyline } from "@react-google-maps/api";
import { selectPoiDetailData } from "../../features/poiDetail/poiDetailSlice";

function Map(props) {
  const editMode = useSelector(isEditMode);
  const paths = useSelector(getPOIPaths);
  const polyLineRefs = useRef([]);
  const polyLineRef = useRef(null);
  const mapRef = useRef(null);
  const mapsRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultProps = {
    center: { lat: 48.9354547453022, lng: 24.700544141400652 },
    zoom: 16,
  };

  const handleApiLoaded = async (map, maps) => {
    const leftPanel = document.querySelector(".left-panel");
    const rightPanel = document.querySelector(".right-panel");
    map.controls[maps.ControlPosition.LEFT].push(leftPanel);
    map.controls[maps.ControlPosition.RIGHT].push(rightPanel);

    polyLineRef.current = new maps.Polyline({
      path: [],
      type: "primary",
      editable: true,
      strokeColor: "#FA12AA",
      strokeOpacity: 1.0,
      strokeWeight: 4,
      map: map,
    });
    mapRef.current = map;
    mapsRef.current = maps;
    map.addListener("click", (event) => mapClickHandler(event, editMode));
  };

  useEffect(() => {
    if (mapRef.current && mapsRef.current) {
      polyLineRefs.current = paths.map((path) => {
        const polyline = new mapsRef.current.Polyline({
          path: path.coordinates.map((coord) => ({
            lat: coord.lat,
            lng: coord.lng,
          })),
          type: "primary",
          editable: false,
          strokeColor: COLOR.BICYCLE_PATH,
          strokeOpacity: 1.0,
          strokeWeight: 4,
          map: mapRef.current,
        });

        polyline.addListener("click", () =>
          handlePolylineClick(polyline, path)
        );
        polyline.addListener("mouseover", () => handlePolylineHover(polyline));
        polyline.addListener("mouseout", () =>
          handlePolylineMouseOut(polyline)
        );
        return polyline;
      });
    }
  }, [paths, mapRef, mapsRef]);

  const handlePolylineClick = (polyline, path) => {
    navigate(`/${path.id}`);
  };

  const handlePolylineHover = (polyline) => {
    polyline.setOptions({
      strokeColor: COLOR.PRIMARY,
      strokeWeight: 8,
    });
  };

  const handlePolylineMouseOut = (polyline) => {
    polyline.setOptions({
      strokeColor: COLOR.BICYCLE_PATH,
      strokeWeight: 4,
    });
  };

  const mapClickHandler = useCallback(
    (event, editMode) => {
      if (!editMode) return;
      let latLng;
      if (event.latLng) {
        latLng = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
      } else {
        latLng = {
          lat: event.lat,
          lng: event.lng,
        };
      }
      const path = polyLineRef.current.getPath();
      path.push(new mapsRef.current.LatLng(latLng.lat, latLng.lng));

      new mapsRef.current.Marker({
        position: latLng,
        title: "#" + path.getLength(),
        map: mapsRef.current,
      });

      const newPathArray = path.getArray().map((latLng) => ({
        lat: latLng.lat(),
        lng: latLng.lng(),
      }));

      dispatch(setNewPath(newPathArray));
    },
    [polyLineRef, mapsRef, dispatch]
  );

  const poi = useSelector(selectPoiDetailData);
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setCenter(
      new mapsRef.current.LatLng(poi.coordinates[0].lat, poi.coordinates[0].lng)
    );
  }, [poi]);

  const childClickHandler = (pos, data) => {};

  const mapOption = (maps) => {
    return {
      panControl: true,
      mapTypeControl: true,
      streetViewControl: true,
    };
  };

  const changeHandler = (event) => {
    dispatch(setZoomLevel(event.zoom));
  };

  const places = useSelector(getPOIPlaces);

  return (
    <div className="map">
      <LeftPanel />
      <RightPanel />
      <GoogleMap
        options={mapOption}
        hoverDistance={20}
        bootstrapURLKeys={{ key: map.key }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        onClick={(event) => mapClickHandler(event, editMode)}
        onChildClick={childClickHandler}
        onChange={changeHandler}
      >
        {places?.map((place) => (
          <Place
            key={place.id}
            lat={place.coordinates[0].lat}
            lng={place.coordinates[0].lng}
            text={place.title}
            place={place}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default Map;
