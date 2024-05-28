import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editMode: false,
  pois: [],
  newPath: [],
  sortOrder: "recent",
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapPOIs: (state, action) => {
      state.pois = action.payload;
    },
    setEditModeState: (state, action) => {
      state.editMode = action.payload;
    },
    setNewPath: (state, action) => {
      state.newPath = action.payload;
    },
    changeSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setZoomLevel: (state, action) => {
      state.zoomLevel = action.payload;
    },
  },
});

export const getMapPOIs = (state) => state.map.pois;
export const getPOIById = (state, id) =>
  state.map.pois.find((pois) => pois.id === state.id);
export const isEditMode = (state) => state.map.editMode;
export const getNewPath = (state) => state.map.newPath;
export const getSelectedType = (state) => state.map.selectedType;
export const getSortOrder = (state) => state.map.sortOrder;
export const getPOIPlaces = (state) =>
  state.map.pois.filter((poi) => poi.type == "place");
export const getPOIPaths = (state) =>
  state.map.pois.filter((poi) => poi.type == "path");
export const getZoomLevel = (state) => state.map.zoomLevel;

export const {
  setMapPOIs,
  setEditModeState,
  setNewPath,
  changeSelectedType,
  setSortOrder,
  setZoomLevel,
} = mapSlice.actions;
export default mapSlice.reducer;
