import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user : null,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails : (state,action)=>{
        state.user = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUserDetails } = UserSlice.actions;

export default UserSlice.reducer;