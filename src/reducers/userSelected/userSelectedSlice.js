import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 name:"",
 lastname:"",
 id:""
}

export const userSelectedSlice = createSlice({
  name: 'userSelected',
  initialState,
  reducers: {
   
    addSesion:(state,action)=>{
        state.mail=action.payload.mail
        state.password=action.payload.password
        state.isLoggedIn=action.payload.isLoggedIn
        state.id=action.payload.id
    },
    finishSesion:(state)=>{
        state.mail=""
        state.password=""
        state.isLoggedIin=false
    },
    selectUser:(state,action)=>{
        state.id=action.payload.id
    }
  },
})

// Action creators are generated for each case reducer function
export const { addSesion,finishSesion,selectUser } = userSelectedSlice.actions

export default userSelectedSlice.reducer