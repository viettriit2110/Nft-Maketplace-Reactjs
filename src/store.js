import { configureStore } from "@reduxjs/toolkit";
import exploreReducer from "./modules/Explore/explore.slice";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    nft: exploreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
