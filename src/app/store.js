import { configureStore } from '@reduxjs/toolkit'
import userReducer  from '../reducers/users/usersSilce'
import dataReducer from '../reducers/data/dataSlice'
import userSelected from '../reducers/userSelected/userSelectedSlice'
export const store = configureStore({
  reducer: {
    user:userReducer, 
    data:dataReducer, 
    userSelected:userSelected
  }
})