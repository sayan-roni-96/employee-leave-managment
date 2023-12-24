import { configureStore } from '@reduxjs/toolkit'
import employeeLeaveSlice from './reducers/employeeLeaveSlice'

export const store = configureStore({
  reducer: {
    employee: employeeLeaveSlice,
  },
})
