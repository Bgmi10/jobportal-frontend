import { createSlice } from "@reduxjs/toolkit";

const getitemfromlocalstorage  = () => {
    const data =  localStorage.getItem('likedjobs') 
    return data ? JSON.parse(data) : []
}

const Likedjobslice = createSlice({
    name : 'likedjobs',
    initialState : getitemfromlocalstorage(),
    reducers : {
        addlikedjobs : (state , action) => {

            state.push(action.payload)
            localStorage.setItem('likedjobs' , JSON.stringify(state))

        },
        removejob : (state , action) => {
           const up =  state.filter(i => i.id !== action.payload.id)
            localStorage.setItem('likedjobs' , JSON.stringify(up))
            return up
        },
        removealljobs : (state ) => {
                const a = state =  []
                localStorage.setItem('likedjobs' , JSON.stringify(a))

                return a 

        }
    }
})


export default Likedjobslice.reducer
export const {addlikedjobs , removejob , removealljobs}    = Likedjobslice.actions