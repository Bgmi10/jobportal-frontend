import { createSlice } from "@reduxjs/toolkit"

const Myjobsslice = createSlice({
    name : 'my jobs',
    initialState :[],
    reducers : {
        addjobs : (state , action) => {
            state.push(action.payload)
           
        }
    }
})

export default Myjobsslice.reducer

export const {addjobs} = Myjobsslice.actions