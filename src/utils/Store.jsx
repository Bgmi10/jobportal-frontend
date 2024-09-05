import { configureStore } from "@reduxjs/toolkit"
import Likedjobslice from "./Likedjobslice"
import Myjobsslice from "./Myjobsslice"

const store = configureStore({

    reducer : {
        likedjobs  : Likedjobslice,
        myjobs : Myjobsslice
    }

})

export default store 