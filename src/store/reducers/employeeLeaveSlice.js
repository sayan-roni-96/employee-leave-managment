import { createSlice } from '@reduxjs/toolkit'
import { getApplyLeaveDetails } from '../actions/employeeLeaveAction'

const initialState = {
  allEmployeeLeaveData: [],
  isLoading: false,
  message: '',
}

const employeeLeaveSlice = createSlice({
  name: 'employeeLeaveSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: function (builder) {
    //Fetch All Employees
    builder.addCase(getApplyLeaveDetails.pending, (state) => {
      state.isLoading = true
      state.message = 'Employee Leave data fetch panding!'
    })

    builder.addCase(getApplyLeaveDetails.fulfilled, (state, action) => {
      // console.log("action=>", action);
      state.isLoading = false
      state.allEmployeeLeaveData = action.payload
      state.message = 'Employee Leave data fetched!'
    })

    builder.addCase(getApplyLeaveDetails.rejected, (state, action) => {
      state.isLoading = false
      state.allEmployeeLeaveData = []
      state.message = 'Something Went Wrong!'
    })
  },
})
export default employeeLeaveSlice.reducer
