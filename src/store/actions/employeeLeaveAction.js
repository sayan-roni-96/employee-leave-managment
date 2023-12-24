import { createAsyncThunk } from '@reduxjs/toolkit'
import API from 'src/api'
export const getApplyLeaveDetails = createAsyncThunk('leave-details/get', async () => {
  // const response = await axios.get(`${rootBaseUrl}/employees`);
  const response = await API.get(`/wp-jwt/v1/apply-leave-details`)
  //const response = await axios.get(`${rootNewBaseUrl}/student`)
  console.log('response-get=>', response)
  return response.data
})
