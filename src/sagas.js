import { all } from "redux-saga/effects";
import { exploreSaga } from "./modules/Explore/explore.saga";

export default function* rootSaga() {
  yield all([exploreSaga()]);
}
