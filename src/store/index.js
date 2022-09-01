import {init} from '@rematch/core';
import loading from '@rematch/loading';
import persistPlugin from '@rematch/persist';
import storage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {news} from './models/newsModel';
import {comments} from './models/commentModel';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const models = {
  news,
  comments,
};

// store
const store = init({
  models,
  plugins: [loading(), persistPlugin(persistConfig)],
});

export default store;
