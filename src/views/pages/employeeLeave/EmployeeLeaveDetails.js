import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getApplyLeaveDetails } from 'src/store/actions/employeeLeaveAction'

const EmployeeLeaveDetails = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getApplyLeaveDetails())
  }, [])

  return <div>Hii</div>
}

export default EmployeeLeaveDetails
