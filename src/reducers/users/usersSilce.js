import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 mail:"",
 password:"",
 id:"",
 name:"",
 lastname:"",
 isLoggedIn:false
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    addSesion:(state,action)=>{
        state.mail=action.payload.mail
        state.password=action.payload.password
        state.isLoggedIn=action.payload.isLoggedIn
        state.id=action.payload.id
        state.name=action.payload.name
        state.lastname=action.payload.lastname
    },
    finishSesion:(state)=>{
        state.mail=""
        state.password=""
        state.isLoggedIin=false
        state.name=""
        state.lastname=""
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount,addSesion,finishSesion } = userSlice.actions

export default userSlice.reducer