import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getApplyLeaveDetails } from 'src/store/actions/employeeLeaveAction'
import DataTable from 'react-data-table-component'

const EmployeeLeaveDetails = () => {
  const dispatch = useDispatch()

  // Fetching data from the Redux store
  const { allEmployeeLeaveData, isLoading } = useSelector((state) => state.employee)
  console.log('allEmployeeLeaveData', allEmployeeLeaveData)

  useEffect(() => {
    // Dispatch the action to get leave details
    dispatch(getApplyLeaveDetails())
  }, [])

  const columns = [
    {
      name: 'Leave ID',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: 'start_date',
      sortable: true,
    },
    {
      name: 'End Date',
      selector: 'end_date',
      sortable: true,
    },
    {
      name: 'Employee Name',
      selector: 'display_name',
      sortable: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
    },
    // Add more columns as needed
  ]

  return (
    <div>
      <h1>Employee Leave Details</h1>
      {/* Check isLoading to show loading indicator */}
      {isLoading ? (
        <div>Loading...</div>
      ) : Array.isArray(allEmployeeLeaveData.data) ? (
        <DataTable
          title="Leave Details"
          columns={columns}
          data={allEmployeeLeaveData.data}
          pagination
        />
      ) : (
        <div>No leave data available</div>
      )}
    </div>
  )
}

export default EmployeeLeaveDetails
