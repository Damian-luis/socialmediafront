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
    addPostData: (state, action) => {
      state.misPublicaciones.push(action.payload)
    },
    updatePostData: (state, action) => {
        for(let i=0; i<state.misPublicaciones.length; i++){
          if(state.misPublicaciones[i].idPublicacion===action.payload.idPublicacion){
            state.misPublicaciones[i].publicacion=action.payload.publicacion
            
          }
        }
        
      
    },
    getPostData:(state,action)=>{
        state.misPublicaciones=action.payload.misPublicaciones
        state.publicacionesAmigos=action.payload.publicacionesAmigos
    },
    deletePostData:(state,action)=>{
      const idPublicacion=action.payload.idPublicacion
      const data=state.misPublicaciones.filter(e=>{
        return e.idPublicacion!==action.payload.idPublicacion
      })
      state.misPublicaciones=data
    }
  },
  
})

// Action creators are generated for each case reducer function
export const { increment, decrement, addPostData ,getPostData,updatePostData,deletePostData} = dataSlice.actions

export default dataSlice.reducer