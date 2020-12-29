import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import createSecureStore from "redux-persist-expo-securestore";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const storage = createSecureStore();

const persistConfig = {
 key: 'root',
 storage: storage,
 blacklist: ['score'],
 stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);