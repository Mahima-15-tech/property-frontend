
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  watchlist: [],
};


const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      const id = action.payload;
     
      // console.log('id in wathcl ist ', id )
    //   duplicate avoid karne ke liye check
    const exists = state.watchlist.includes(id);

    if (!exists) {
      state.watchlist.push(id);
      toast.success("Add to watchlist")
    } else {
      // console.log("Already exists");
      toast.error("Already exists in watchlist")
    }
    },

    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (property) => property._id !== action.payload
      );
    },

    clearWatchlist: (state) => {
      state.watchlist = [];
    },
  },
});

export const {
  addToWatchlist,
  removeFromWatchlist,
  clearWatchlist,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;