import { call, put, takeLatest } from "redux-saga/effects";
import { getListService } from "./explore.service";
import {
  loadNFTList,
  loadingNFT,
  loadNFTFailue,
  loadMoreNFT as loadmore,
  concateNFTs,
} from "./explore.slice";

export function* loadNFTListSaga(params) {
  try {
    const result = yield call(getListService, params);
    yield put(loadingNFT(result));
  } catch (error) {
    console.warn(error);
    yield put(loadNFTFailue({ message: error.message }));
  }
}

export function* loadMoreNFT(params) {
  try {
    const result = yield call(getListService, params);

    yield put(concateNFTs(result));
  } catch (error) {
    console.warn(error);
    yield put(loadNFTFailue({ message: error.message }));
  }
}

export function* exploreSaga() {
  yield takeLatest(loadNFTList.type, loadNFTListSaga);
  yield takeLatest(loadmore.type, loadMoreNFT);
}
