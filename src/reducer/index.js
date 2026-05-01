import { combineReducers } from "@reduxjs/toolkit"

import kycReducer from "../slices/kycslice"
import watchlistReducer from "../slices/watchlistSlice"
import propertyReducer from "../slices/propertySlice"


const rootReducer = combineReducers({
  kyc: kycReducer,
  watchlist: watchlistReducer,
  property: propertyReducer,
 
})

export default rootReducer
