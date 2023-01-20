import { configureStore } from '@reduxjs/toolkit'
import userReducer  from '../reducers/users/usersSilce'
export const store = configureStore({
  reducer: {
    user:userReducer
  },
})