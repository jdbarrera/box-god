import { createStore, applyMiddleware } from "redux";
import { Platform } from 'react-native';
import rootReducer from "./reducers";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import createSecureStore from "redux-persist-expo-securestore";
import webStorage from "redux-persist/lib/storage";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const reactNativeStorage = createSecureStore();

const storage = Platform.OS === 'ios' || Platform.OS === 'android'
  ? reactNativeStorage : webStorage;

const persistConfig = {
 key: 'root',
 storage: storage,
 blacklist: ['score'],
 stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);