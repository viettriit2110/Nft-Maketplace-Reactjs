import { createSlice } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: "",
  listItem: [],
};

export const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    loadingNFT(state, action) {
      const { data: listItem, paging, filter } = action.payload;
      return {
        ...initialState,
        loading: false,
        listItem,
        paging,
        filter,
        error: "",
      };
    },
    concateNFTs(state, action) {
      const { data, paging, filter } = action.payload;

      let newList = [...state.listItem]

      if (data) {
        newList.push(...data)
      }

      return {
        ...state,
        loading: false,
        listItem: newList,
        paging,
        filter,
        error: "",
      };
    },
    loadNFTFailue(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadingNFT, NFTReceived, loadNFTFailue, concateNFTs } = exploreSlice.actions;

export const loadNFTList = createAction("explore/loadNFTListAsync");

export const loadMoreNFT = createAction("explore/loadMoreNFT", (params) => ({
  payload: params,
}));

export const selectNFTState = (state) => state.nft;
export const selectNFTList = (state) => state.nft.listItem;

export default exploreSlice.reducer;
