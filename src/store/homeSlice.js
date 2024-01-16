import { createSlice } from "@reduxjs/toolkit";

export const getHomeSlice = createSlice({
  name: "home",
  initialState: {
    url: {},
    genres: {},
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { getApiConfiguration, getGenres } = getHomeSlice.actions;
export default getHomeSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// export const homeSlice = createSlice({
//     name: "home",
//     initialState: {
//         url: {},
//         genres: {},
//     },
//     reducers: {
//         getApiConfiguration: (state, action) => {
//             state.url = action.payload;
//         },
//         getGenres: (state, action) => {
//             state.genres = action.payload;
//         },
//     },
// });

// // Action creators are generated for each case reducer function
// export const { getApiConfiguration, getGenres } = homeSlice.actions;

// export default homeSlice.reducer;
