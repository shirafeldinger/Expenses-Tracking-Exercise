import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import expensesReducer from '../slices/useSlice';

const persistConfig = {
  key: 'expenses',
  storage: AsyncStorage,
  whitelist: ['sections'],
};

const persistedReducer = persistReducer(persistConfig, expensesReducer);

const store = configureStore({
  reducer: {
    expenses: persistedReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;
