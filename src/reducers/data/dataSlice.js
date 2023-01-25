import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 misPublicaciones: [],
 publicacionesAmigos:[]
}

export const dataSlice = createSlice({
  name: 'data',
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
    getPostData:(state,action)=>{
        state.misPublicaciones=action.payload.misPublicaciones
        state.publicacionesAmigos=action.payload.publicacionesAmigos
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount,getPostData } = dataSlice.actions

export default dataSlice.reducer