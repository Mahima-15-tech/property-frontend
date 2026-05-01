import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    aadhaarPreview: null,
    aadharNum:"",

    panPreview: null,
    panNum:"",
   
    name: "",
    email:"",
    dob:"",
    address:"",
    isVerified: false,

    nomineeName:"",
    nomineePan:"",
    nomineeAadhar:"",
    nomineeDob:"",

    branchName:"",
    ifsCode:"",
    accountNum:"",
    beneficiaryName:"",
    cancelCheckUpload:null,

}

const kycSlice = createSlice({
  name: "kyc",
  initialState: initialState,
  reducers: {

      setNominee: (state, action) => {
        state.nomineeName = action.payload.nomineeName;
        state.nomineePan = action.payload.nomineePan;
        state.nomineeAadhar = action.payload.nomineeAadhar;
        state.nomineeDob = action.payload.nomineeDob;
      },
        
      setBank: (state, action) => {
        state.accountNum = action.payload.accountNum;
        state.branchName = action.payload.branchName;
        state.ifsCode = action.payload.ifsCode;
        state.beneficiaryName = action.payload.beneficiaryName;
        state.cancelCheckUpload = action.payload.cancelCheckUpload
      },

      setAadhaar: (state, action) => {
        if (action.payload.aadharNum !== undefined) {
          state.aadharNum = action.payload.aadharNum;
        }
        if (action.payload.aadhaarPreview !== undefined) {
          state.aadhaarPreview = action.payload.aadhaarPreview;
        }
      },

      setPan: (state, action) => {
        if (action.payload.panNum !== undefined) {
          state.panNum = action.payload.panNum;
        }
        if (action.payload.panPreview !== undefined) {
          state.panPreview = action.payload.panPreview;
        }
      },

      setKycData: (state, action) => {
        const {  name, address, email, dob} = action.payload;
        state.name = name;
        state.address = address;
        state.email = email;
        state.dob = dob;
        state.isVerified = true;
      },
    
  },
})

export const { setAadhaar, setKycData, setPan, setBank, setNominee  } = kycSlice.actions

export default kycSlice.reducer
